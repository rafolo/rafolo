package com.rafolo.cumulocity;

import java.math.BigDecimal;

import c8y.Position;

import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;
import com.cumulocity.sdk.client.Platform;
import com.cumulocity.sdk.client.PlatformImpl;
import com.cumulocity.sdk.client.alarm.AlarmFilter;
import com.cumulocity.sdk.client.inventory.InventoryApi;

public class Main {

	/**
	 * @param args
	 */
	@SuppressWarnings("deprecation")
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		@SuppressWarnings("deprecation")
		Platform platform = new PlatformImpl("http://pkey.cumulocity.com", "pkey", "admin1", "Im1gbqiM", null);
		InventoryApi inventory = platform.getInventoryApi();
		ManagedObjectRepresentation mo = new ManagedObjectRepresentation();
		Object o = new Object();
		mo.set(o, "c8y_IsDevice");
		mo.setName("Hello, world!");
		mo = inventory.create(mo);
		
		System.out.println("URL: " + mo.getSelf());
		
		//To get page of managed objects from inventory you have to type:
		platform.getInventoryApi().getManagedObjects().get();
		
		//To get alarms raised by managed object:
		platform.getAlarmApi().getAlarmsByFilter(new AlarmFilter().bySource(mo));
		
		//to see them on a map you have to add to your managed object additional property c8y.Position (this class contains three fields lat,lng and alt, it's available in java-client jar); 
		c8y.Position p = new Position();
		p.setLat(BigDecimal.ZERO);
		p.setLng(BigDecimal.ZERO);
		p.setAlt(BigDecimal.ZERO);
		//e.g. new ManagedObjectRepresentation().set(p)
		mo.set(p);
		inventory.update(mo);

	}

}
