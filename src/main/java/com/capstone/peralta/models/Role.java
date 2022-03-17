package com.capstone.peralta.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "ROLES")
public class Role {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column (name="role_id", nullable = false, unique = true)
    private Integer roleId;
    @Column (name="role_name", nullable = false, unique = true)
    private String roleName;

    public Integer getRoleId() { return roleId; }

    private void setRoleId(Integer roleId) { this.roleId = roleId; } //Not necessary, left unusable, might remove later

    public String getRoleName() { return roleName; }

    private void setRoleName(String roleName) { this.roleName = roleName; }
}
