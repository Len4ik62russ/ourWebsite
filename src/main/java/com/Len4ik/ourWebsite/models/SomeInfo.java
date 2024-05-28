package com.Len4ik.ourWebsite.models;
/*import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity*/
public class SomeInfo {
    // Этого поля не было прописано в задании, но ID всегда необходимо устанавливать
   /* @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;*/

    private String email, phone, name;

    private short age;

    private float happiness;

    private boolean hasCar;

    // Функции по установке данных
    // Можно и не в одну строку записывать, но так компактнее выглядит

    /*public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }*/

    public String getEmail() { return email; }

    public void setEmail(String email) { this.email = email; }

    public String getPhone() { return phone; }

    public void setPhone(String phone) { this.phone = phone; }

    public String getName() { return name; }

    public void setName(String name) { this.name = name; }

    public short getAge() { return age; }

    public void setAge(short age) { this.age = age; }

    public float getHappiness() { return happiness; }

    public void setHappiness(float happiness) { this.happiness = happiness; }

    public boolean isHasCar() { return hasCar; }

    public void setHasCar(boolean hasCar) { this.hasCar = hasCar; }
}
