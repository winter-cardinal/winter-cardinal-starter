package app.security;

import app.db.account.Account;
import app.db.account.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {
	private final AccountService accountService;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		return new AccountBasedUserDetails(findUserbyUsername(username));
	}

	private Account findUserbyUsername(String username) {
		final var result = accountService.find(username);
		if (result.isPresent()) {
			return result.get();
		}
		throw new UsernameNotFoundException(username);
	}
}
