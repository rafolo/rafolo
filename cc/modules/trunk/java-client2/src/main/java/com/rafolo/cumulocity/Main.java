package com.rafolo.cumulocity;

import java.math.BigDecimal;

import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;
import com.cumulocity.sdk.client.Platform;
import com.cumulocity.sdk.client.PlatformImpl;
import com.cumulocity.sdk.client.alarm.AlarmCollection;
import com.cumulocity.sdk.client.alarm.AlarmFilter;
import com.cumulocity.sdk.client.inventory.InventoryApi;
import com.cumulocity.sdk.client.inventory.ManagedObjectCollection;
import com.cumulocity.sdk.client.inventory.PagedManagedObjectCollectionRepresentation;

public class Main {

	public static void main(String[] args) {

		@SuppressWarnings("deprecation")
		Platform platform = new PlatformImpl("http://pkey.cumulocity.com",
				"pkey", "admin1", "Im1gbqiM", null);
		InventoryApi inventory = platform.getInventoryApi();

		ManagedObjectRepresentation mo = new ManagedObjectRepresentation();
		Object o = new Object();
		mo.set(o, "c8y_IsDevice");
		mo.setName("Hello, world2!");
		mo = inventory.create(mo);

		System.out.println("URL: " + mo.getSelf());

		ManagedObjectRepresentation update = new ManagedObjectRepresentation();
		update.setId(mo.getId());

		c8y.Position p =

		new c8y.Position();
		p.setLat(

		new BigDecimal(19));
		p.setLng(

		new BigDecimal(49));
		p.setAlt(

		new BigDecimal(300));

		update.set(p);

		inventory.update(update);

	}
}