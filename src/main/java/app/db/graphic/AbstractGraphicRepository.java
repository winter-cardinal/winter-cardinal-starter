package app.db.graphic;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

@NoRepositoryBean
public interface AbstractGraphicRepository<T extends AbstractGraphic> extends JpaRepository<T, Long> {
	List<GraphicFound> findAllByNameStartsWith(String name);
	Optional<T> findByName(String name);
}
