package com.myproject.config;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Optional;

import org.springframework.data.domain.AuditorAware;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

@Component(value = "auditorWare")
public class SpringSecurityAuditorWare implements AuditorAware<String>{

	@Override
	public Optional<String> getCurrentAuditor() {
		// TODO Auto-generated method stub
		Collection<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
		authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
		
		String email = "guest";
		
//		return Optional.ofNullable(SecurityContextHolder.getContext())
//				.map(SecurityContext::getAuthentication)
//				.filter(Authentication::isAuthenticated)
//				.map(Authentication::getPrincipal)
//				.map(User.class::cast);
		
		return Optional.of(email);
	}

}
