package com.rafolo.cumulocity;

import com.cumulocity.rest.representation.inventory.ManagedObjectRepresentation;
import com.cumulocity.sdk.client.Platform;
import com.cumulocity.sdk.client.PlatformImpl;
import com.cumulocity.sdk.client.inventory.InventoryApi;

public class Main {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		@SuppressWarnings("deprecation")
		Platform platform = new PlatformImpl("http://pkey.cumulocity.com", "pkey", "admin1", "Im1gbqiM", null);
		InventoryApi inventory = platform.getInventoryApi();
		ManagedObjectRepresentation mo = new ManagedObjectRepresentation();
		mo.setName("Hello, world!");
		mo = inventory.create(mo);
		System.out.println("URL: " + mo.getSelf());

	}

}
