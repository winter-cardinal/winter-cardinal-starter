package app.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import app.db.account.Account;
import app.db.account.AccountService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {
	private final AccountService accountService;
	private final PasswordEncoder passwordEncoder;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		return new AccountBasedUserDetails(findUserbyUsername(username));
	}

	private Account findUserbyUsername(String username) {
		// Find an account from the data base
		final var result = accountService.find(username);
		if (result.isPresent()) {
			return result.get();
		}

		// TODO: Please remove this account
		if (username.equals("Account1")) {
			return new Account(null, username, passwordEncoder.encode("Account1"));
		}

		throw new UsernameNotFoundException(username);
	}
}
