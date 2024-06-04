package app.db.account;

import java.util.Optional;

import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AccountService {
	private final AccountRepository accountRepository;

	public Optional<Account> find(String name) {
		return accountRepository.findByName(name);
	}
}
