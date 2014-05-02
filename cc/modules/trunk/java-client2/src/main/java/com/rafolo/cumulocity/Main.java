package com.rafolo.cumulocity;

import java.math.BigDecimal;

import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;
import com.cumulocity.sdk.client.Platform;
import com.cumulocity.sdk.client.PlatformImpl;
import com.cumulocity.sdk.client.inventory.InventoryApi;

public class Main {

public static void main(String[] args) {

    @SuppressWarnings("deprecation")
	Platform platform = new PlatformImpl("http://pkey.cumulocity.com", "pkey", "admin1", "Im1gbqiM", null);
    InventoryApi inventory = platform.getInventoryApi();

    ManagedObjectRepresentation mo = new ManagedObjectRepresentation();
    Object o = new Object();
    mo.set(o, "c8y_IsDevice");
    mo.setName("Hello, world2!");
    mo = inventory.create(mo);

    System.out.println("URL: " + mo.getSelf());

    //To get page of managed objects from inventory you have to type: 

    platform.getInventoryApi().getManagedObjects().get();

    //To get alarms raised by managed object: 
// platform.getAlarmApi().getAlarmsByFilter(new AlarmFilter().bySource(managedObjectID));

    //to see them on a map you have to add to your managed object 

    c8y.Position p = new c8y.Position();

    p.setLat(new BigDecimal(19));

    p.setLng(new BigDecimal(49));

    p.setAlt(new BigDecimal(300));

    mo.set(p);
   

    inventory.update(mo);
}
}