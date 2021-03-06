package org.iesalixar.poriad.security.entity;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import org.iesalixar.poriad.entity.CarRental;
import org.iesalixar.poriad.entity.Cart;
import org.iesalixar.poriad.entity.Classes;
import org.iesalixar.poriad.entity.Comment;
import org.iesalixar.poriad.entity.Hotel;
import org.iesalixar.poriad.entity.Payment;
import org.iesalixar.poriad.entity.SkiMaterial;
import org.iesalixar.poriad.entity.Trip;
import org.springframework.beans.factory.annotation.Value;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.sun.istack.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class UserSnowy {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotNull
	private String firstName;

	@NotNull
	private String lastName;

	@NotNull
	@Column(unique = true)
	private String username;

	@NotNull
	private String password;

	@NotNull
	private String email;

	private String address;

	private boolean newsletter;

	@Value("${model.isEnterprise}")
	private int isEnterprise;

	@Value("${model.isActive}")
	private int isActive;

	private String phone;

	private String urlImages;

	private String nomComercial;

	private String NIF;

	private String CNAE;

	private String activity;

	private String location;

	private String enterprisePhone;

	private String enterpriseEmail;

	@JsonIgnore
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	private Set<CarRental> carRental;

	@JsonIgnore
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	private Set<Classes> classes;

	@JsonIgnore
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	private Set<Hotel> hotel;

	@JsonIgnore
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	private Set<SkiMaterial> skiMaterial;

	@ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinTable(name = "user_rol", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"))
	private Set<Role> roles = new HashSet<>();

	@JsonIgnore
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	private Set<Payment> payment;

	@JsonIgnore
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "cart_id", referencedColumnName = "id")
	private Cart cart;

	@JsonIgnore
	@OneToOne(mappedBy = "user")
	private Trip trip;

	@JsonIgnore
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	private Set<Comment> comments;

	public UserSnowy(String firstName, String lastName, String username, String password, String email, String address,
			boolean newsletter, String phone, String urlImages) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.username = username;
		this.password = password;
		this.email = email;
		this.address = address;
		this.newsletter = newsletter;
		this.phone = phone;
		this.urlImages = urlImages;
	}

	public UserSnowy(String username, String password, String email) {
		this.username = username;
		this.password = password;
		this.email = email;

	}

	public UserSnowy(String firstName, String lastName, String username, String password, String email, String address,
			boolean newsletter, String phone) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.username = username;
		this.password = password;
		this.email = email;
		this.address = address;
		this.newsletter = newsletter;
		this.isActive = 1;
		this.phone = phone;
	}

}
