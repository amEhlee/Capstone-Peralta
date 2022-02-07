package com.capstone.peralta.repos;

import com.capstone.peralta.models.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepo extends JpaRepository<Role, Integer> {
    Role findByRoleId(Integer roleId);
    Role findByRoleName(String roleName);
}
