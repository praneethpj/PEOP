package com.peop.backend.repository;

/**
 * @author Praneethpj
 */

import com.peop.backend.model.Role;
import com.peop.backend.model.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(RoleName roleName);
}