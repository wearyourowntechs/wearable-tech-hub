CREATE TABLE `product_reviews` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`reviewSlug` varchar(255) NOT NULL,
	`productName` text NOT NULL,
	`userName` varchar(255) NOT NULL,
	`userEmail` varchar(320) NOT NULL,
	`rating` int NOT NULL,
	`comment` text NOT NULL,
	`isVerifiedPurchase` int NOT NULL DEFAULT 0,
	`purchaseDate` timestamp,
	`purchaseAmount` int,
	`productVariant` varchar(255),
	`helpfulCount` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `product_reviews_id` PRIMARY KEY(`id`)
);
