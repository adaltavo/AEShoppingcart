/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package mx.edu.ittepic.shoppingcart.ejbs;

import com.google.gson.GsonBuilder;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.PostConstruct;
import javax.ejb.EJB;
import javax.ejb.Remote;
import javax.ejb.Remove;
import javax.ejb.Stateful;
import mx.edu.ittepic.shoppingcart.entities.Product;

/**
 *
 * @author gustavo
 */
@Stateful
@Remote(CartBeanRemote.class)
@EJB(name = "ejb/CartBean", beanInterface = CartBeanRemote.class, beanName = "CartBean")
public class CartBean implements CartBeanRemote {
    
    List<Product> cart;

    @Override
    public String addProduct(String productid, String productname) {
        Product p = new Product();
        p.setProductid(Integer.parseInt(productid));
        p.setProductname(productname);
        
        cart.add(p);
        
        return new GsonBuilder().create().toJson(cart);
    }

    @Override
    public String removeProduct(String productid) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    @Override
    @Remove
    public void close() {
        
    }
    
    @Override
    @PostConstruct
    public void init() {
        cart = new ArrayList<>();
    }

    // Add business logic below. (Right-click in editor and choose
    // "Insert Code > Add Business Method")
}
