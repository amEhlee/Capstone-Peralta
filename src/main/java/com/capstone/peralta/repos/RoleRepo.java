package com.capstone.peralta.repos;

import com.capstone.peralta.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * The interface Role repository.
 *
 * @author Don Laliberte
 */
@Repository
public interface RoleRepo extends JpaRepository<Role, Integer> {
    /**
     * Find by role name.
     *
     * @param roleName the role name
     * @return the role
     */
    Role findByRoleName(String roleName);
}
