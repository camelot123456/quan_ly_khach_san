package com.myproject.security.oauth2;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.myproject.entity.AccountEntity;
import com.myproject.entity.enums.EAuthProvider;
import com.myproject.exception.OAuth2AuthenticationProcessingException;
import com.myproject.repository.IAccountRepo;
import com.myproject.security.AccountPrincipal;
import com.myproject.security.oauth2.user.OAuth2UserInfo;
import com.myproject.security.oauth2.user.OAuth2UserInfoFactory;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

	@Autowired
	private IAccountRepo accountRepo;

	@Override
	public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
		// TODO Auto-generated method stub
		OAuth2User oauth2User = super.loadUser(userRequest);
		try {
			return processOAuth2User(userRequest, oauth2User);
		} catch (AuthenticationException e) {
			// TODO: handle exception
			throw e;
		} catch (Exception ex) {
			throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause());
		}
	}

	private OAuth2User processOAuth2User(OAuth2UserRequest userRequest, OAuth2User oauth2User) {
		// TODO Auto-generated method stub
		OAuth2UserInfo oauth2UserInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(userRequest.getClientRegistration().getRegistrationId(), oauth2User.getAttributes());
		if (oauth2UserInfo.getEmail().isEmpty()) {
			throw new OAuth2AuthenticationProcessingException("Email not found from OAuth2 provider");
		}	
		
		Optional<AccountEntity> accountOptional = accountRepo.findByEmail(oauth2UserInfo.getEmail());
		AccountEntity account;
		
		if (accountOptional.isPresent()) {
			account = accountOptional.get();
			if (!account.getAuthProvider().equals(EAuthProvider.valueOf(userRequest.getClientRegistration().getRegistrationId()))) {
				throw new OAuth2AuthenticationProcessingException("Looks like you're signed up with " +
						account.getAuthProvider() + " account. Please use your " + account.getAuthProvider() +
                        " account to login.");
			}
			account = updateExistingAccount(account, oauth2UserInfo);
			
		} else {
			account = registerNewAccount(userRequest, oauth2UserInfo);
		}
		return AccountPrincipal.create(account, oauth2User.getAttributes());
	}

	private AccountEntity registerNewAccount(OAuth2UserRequest userRequest, OAuth2UserInfo oauth2UserInfo) {
		// TODO Auto-generated method stub
		AccountEntity account = new AccountEntity();
		account.setId(oauth2UserInfo.getId());
		account.setName(oauth2UserInfo.getName());
		account.setAvatar(oauth2UserInfo.getImageUrl());;
		account.setAuthProvider(EAuthProvider.valueOf(userRequest.getClientRegistration().getRegistrationId()));
		account.setVerified(true);
		return accountRepo.save(account);
	}

	private AccountEntity updateExistingAccount(AccountEntity account, OAuth2UserInfo oauth2UserInfo) {
		// TODO Auto-generated method stub
		account.setName(oauth2UserInfo.getName());
		account.setAvatar(oauth2UserInfo.getImageUrl());
		return accountRepo.save(account);
	}

}
