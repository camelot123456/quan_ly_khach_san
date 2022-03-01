package com.myproject.security.oauth;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.myproject.entity.AccountEntity;
import com.myproject.repository.IAccountRepo;
import com.myproject.security.UserPrincipal;

@Service
public class CustomUserDetailService implements UserDetailsService{

	@Autowired
	private IAccountRepo accountRepo;
	
	@Transactional
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		AccountEntity account = accountRepo.findByEmail(email)
				.orElseThrow(() -> new UsernameNotFoundException("Email not found !!"));
		if (!account.getVerified() || !account.getEnabled()) {
			return null;
		}
		List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
		
		account.getAccountRoleArr().forEach(accountRole -> {
			authorities.add(new SimpleGrantedAuthority("ROLE_" + accountRole.getRole().getCode()));
		});
	
		return UserPrincipal.createOAuth(account, authorities);
	}
	
	@Transactional
	public UserDetails loadUserById(String id) throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		AccountEntity account = accountRepo.findById(id)
				.orElseThrow(() -> new UsernameNotFoundException("Id not found !!"));
		if (!account.getVerified() || !account.getEnabled()) {
			return null;
		}
		List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
		
		account.getAccountRoleArr().forEach(accountRole -> {
			authorities.add(new SimpleGrantedAuthority("ROLE_" + accountRole.getRole().getCode()));
		});
	
		return UserPrincipal.createOAuth(account, authorities);
	}

}
