package com.capstone.peralta.models;

import javax.persistence.*;

@Entity
@Table(name = "ROLES")
public class Role {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer roleId;
    private String roleName;

    public Role() {
    }

    public Integer getRoleId() { return roleId; }

    private void setRoleId(Integer roleId) { this.roleId = roleId; } //Not necessary, left unusable, might remove later

    public String getRoleName() { return roleName; }

    private void setRoleName(String roleName) { this.roleName = roleName; }
}
