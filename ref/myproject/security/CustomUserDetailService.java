package com.myproject.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.myproject.entity.AccountEntity;
import com.myproject.exception.ResourceNotFoundException;
import com.myproject.repository.IAccountRepo;

@Service
public class CustomUserDetailService implements UserDetailsService {

	@Autowired
	private IAccountRepo accountRepo;
	
	@Transactional
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		AccountEntity account = accountRepo.findByEmail(email)
				.orElseThrow(() -> new UsernameNotFoundException("Email not found!"));
		return AccountPrincipal.create(account);
	}
	
	@Transactional
	public UserDetails loadUserById(String id) throws UsernameNotFoundException {
		AccountEntity account = accountRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("User", "id", id));
		return AccountPrincipal.create(account);
	}

}
