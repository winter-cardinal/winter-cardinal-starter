package app.db.account;

import java.util.Optional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AccountService {
	private final AccountRepository accountRepository;

	public Optional<Account> find(String name) {
		return accountRepository.findByName(name);
	}
}
