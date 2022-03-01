package com.myproject.security.oauth2;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import com.myproject.entity.AccountEntity;
import com.myproject.entity.enums.EAuthProvider;
import com.myproject.repository.IAccountRepo;
import com.myproject.security.UserPrincipal;

@Service
public class CustomOAuth2DetailService extends DefaultOAuth2UserService{
	
	@Autowired
	private IAccountRepo accountRepo;

	@Override
	public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
		// TODO Auto-generated method stub
		OAuth2User oAuth2User = super.loadUser(userRequest);
		return handleOAuth2User(userRequest, oAuth2User);
	}
	
	private OAuth2User handleOAuth2User(OAuth2UserRequest userRequest, OAuth2User oAuth2User) {
		// TODO Auto-generated method stub
		OAuth2UserInfo oAuth2UserInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(userRequest.getClientRegistration().getRegistrationId(), oAuth2User.getAttributes());
		
		Optional<AccountEntity> account = accountRepo.findByEmail(oAuth2UserInfo.getEmail());
		
		AccountEntity accountNew ;
		if (account.isPresent()) {
			accountNew = account.get();
			if (!accountNew.getAuthProvider().equals(userRequest.getClientRegistration().getRegistrationId())) {
				throw new OAuth2AuthenticationException("Có vẻ như bạn đã đăng ký bằng tài khoản "+accountNew.getAuthProvider()+". "
						+ "Vui lòng sử dụng tài khoản "+accountNew.getAuthProvider()+" của bạn để đăng nhập.");
			}
			accountNew = handleUpdateAccount(accountNew, oAuth2UserInfo);
		} else {
			accountNew = handleCreateAccount(userRequest, oAuth2UserInfo);
		}
		
		return UserPrincipal.createOAuth2(accountNew, oAuth2User.getAttributes());
	}

	private AccountEntity handleCreateAccount(OAuth2UserRequest userRequest, OAuth2UserInfo oAuth2UserInfo) {
		// TODO Auto-generated method stub
		AccountEntity accountNew = new AccountEntity();
		accountNew.setId(oAuth2UserInfo.getId());
		accountNew.setAuthProvider(EAuthProvider.valueOf(userRequest.getClientRegistration().getRegistrationId()));
		accountNew.setName(oAuth2UserInfo.getName());
		accountNew.setAvatar(oAuth2UserInfo.getAvatarUrl());
		accountNew.setEmail(oAuth2UserInfo.getEmail());
		accountNew.setEnabled(true);
		accountNew.setVerified(true);
		return accountRepo.save(accountNew);
	}

	private AccountEntity handleUpdateAccount(AccountEntity accountNew, OAuth2UserInfo oAuth2UserInfo) {
		// TODO Auto-generated method stub
		accountNew.setName(oAuth2UserInfo.getName());
		accountNew.setAvatar(oAuth2UserInfo.getAvatarUrl());
		
		return accountRepo.save(accountNew);
	}
	
}
