package app.security;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import app.db.account.Account;

public class AccountBasedUserDetails implements UserDetails {
	protected static final long serialVersionUID = -719288489123L;
	protected final Account account;
	protected final List<GrantedAuthority> authorities;

	AccountBasedUserDetails( Account account ) {
		this.account = account;
		this.authorities = new ArrayList<>();
	}

	public Account getAccount() {
		return this.account;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return this.authorities;
	}

	@Override
	public String getPassword() {
		return this.account.getPassword();
	}

	@Override
	public String getUsername() {
		return this.account.getName();
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}
}
