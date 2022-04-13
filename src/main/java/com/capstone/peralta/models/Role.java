package com.capstone.peralta.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

/**
 * This is the model for roles
 * represents the level of privledges any given user has
 * @author Don Laliberte
 */
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

    /**
     * Gets role id.
     * @return the role id
     */
    public Integer getRoleId() { return roleId; }

    /**
     * Sets role id.
     * @param roleId the role id
     */
    private void setRoleId(Integer roleId) { this.roleId = roleId; } //Not necessary, left unusable, might remove later

    /**
     * Gets role name.
     * @return the role name
     */
    public String getRoleName() { return roleName; }

    /**
     * Sets role name.
     * @param roleName the role name
     */
    private void setRoleName(String roleName) { this.roleName = roleName; }
}
