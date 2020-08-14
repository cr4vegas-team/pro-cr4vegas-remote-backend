import {MigrationInterface, QueryRunner} from "typeorm";

export class test1597819152843 implements MigrationInterface {
    name = 'test1597819152843'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `users` (`id` int NOT NULL AUTO_INCREMENT, `username` varchar(45) NOT NULL, `email` varchar(225) NOT NULL, `password` varchar(250) NOT NULL, `active` tinyint NOT NULL DEFAULT 1, `created` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_fe0bb3f6520ee0469504521e71` (`username`), UNIQUE INDEX `IDX_97672ac88f789774dd47f7c8be` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `sectors` (`id` int NOT NULL AUTO_INCREMENT, `code` varchar(15) NOT NULL, `name` varchar(45) NOT NULL, `description` text NOT NULL, `updated` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `created` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `active` tinyint NOT NULL DEFAULT 1, UNIQUE INDEX `IDX_182f6a983ef4914b39c1aae548` (`code`), UNIQUE INDEX `IDX_1a10b192342e5165948f4dccef` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `sets-types` (`name` varchar(45) NOT NULL, PRIMARY KEY (`name`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `sets` (`id` int NOT NULL AUTO_INCREMENT, `code` varchar(15) NOT NULL, `name` varchar(45) NOT NULL, `description` text NOT NULL, `updated` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `created` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `active` tinyint NOT NULL DEFAULT 1, `set_type` varchar(45) NULL, UNIQUE INDEX `IDX_c08b4999f129be8ed34d4a45b3` (`code`), UNIQUE INDEX `IDX_56e79ff88a5ebd0e1930810f3b` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `stations` (`id` int NOT NULL AUTO_INCREMENT, `code` varchar(15) NOT NULL, `name` varchar(45) NOT NULL, `altitude` float NOT NULL DEFAULT 0, `latitude` double NOT NULL DEFAULT 0, `longitude` double NOT NULL DEFAULT 0, `description` text NOT NULL, `updated` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `created` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `active` tinyint NOT NULL DEFAULT 1, UNIQUE INDEX `IDX_4527107221143b0530c23ef1d6` (`code`), UNIQUE INDEX `IDX_998a2ff0191749951c74b9ba89` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `units` (`id` int NOT NULL AUTO_INCREMENT, `unit_type` enum ('GENERIC', 'HYDRANT') NOT NULL, `code` varchar(45) NOT NULL, `altitude` float NOT NULL, `latitude` double NOT NULL, `longitude` double NOT NULL, `description` varchar(500) NOT NULL, `active` tinyint NOT NULL DEFAULT 1, `created` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updated` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `stationId` int NULL, `sectorId` int NULL, UNIQUE INDEX `IDX_47635c1ab22d02fc3ebae3608b` (`code`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `units_hydrants` (`code` varchar(45) NOT NULL, `diameter` int NOT NULL DEFAULT 0, `filter` tinyint NOT NULL DEFAULT 0, `unitId` int NULL, UNIQUE INDEX `REL_e808d632dfab0fe1b8b3bfd07e` (`unitId`), PRIMARY KEY (`code`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `sets` ADD CONSTRAINT `FK_7de34ab9b2a826f63cb71f1c36f` FOREIGN KEY (`set_type`) REFERENCES `sets-types`(`name`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `units` ADD CONSTRAINT `FK_4abdc07793aa8188949c6836d20` FOREIGN KEY (`stationId`) REFERENCES `stations`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `units` ADD CONSTRAINT `FK_dfbb86a4f1ead390c9dbc4ecbb3` FOREIGN KEY (`sectorId`) REFERENCES `sectors`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `units_hydrants` ADD CONSTRAINT `FK_e808d632dfab0fe1b8b3bfd07ea` FOREIGN KEY (`unitId`) REFERENCES `units`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `units_hydrants` DROP FOREIGN KEY `FK_e808d632dfab0fe1b8b3bfd07ea`");
        await queryRunner.query("ALTER TABLE `units` DROP FOREIGN KEY `FK_dfbb86a4f1ead390c9dbc4ecbb3`");
        await queryRunner.query("ALTER TABLE `units` DROP FOREIGN KEY `FK_4abdc07793aa8188949c6836d20`");
        await queryRunner.query("ALTER TABLE `sets` DROP FOREIGN KEY `FK_7de34ab9b2a826f63cb71f1c36f`");
        await queryRunner.query("DROP INDEX `REL_e808d632dfab0fe1b8b3bfd07e` ON `units_hydrants`");
        await queryRunner.query("DROP TABLE `units_hydrants`");
        await queryRunner.query("DROP INDEX `IDX_47635c1ab22d02fc3ebae3608b` ON `units`");
        await queryRunner.query("DROP TABLE `units`");
        await queryRunner.query("DROP INDEX `IDX_998a2ff0191749951c74b9ba89` ON `stations`");
        await queryRunner.query("DROP INDEX `IDX_4527107221143b0530c23ef1d6` ON `stations`");
        await queryRunner.query("DROP TABLE `stations`");
        await queryRunner.query("DROP INDEX `IDX_56e79ff88a5ebd0e1930810f3b` ON `sets`");
        await queryRunner.query("DROP INDEX `IDX_c08b4999f129be8ed34d4a45b3` ON `sets`");
        await queryRunner.query("DROP TABLE `sets`");
        await queryRunner.query("DROP TABLE `sets-types`");
        await queryRunner.query("DROP INDEX `IDX_1a10b192342e5165948f4dccef` ON `sectors`");
        await queryRunner.query("DROP INDEX `IDX_182f6a983ef4914b39c1aae548` ON `sectors`");
        await queryRunner.query("DROP TABLE `sectors`");
        await queryRunner.query("DROP INDEX `IDX_97672ac88f789774dd47f7c8be` ON `users`");
        await queryRunner.query("DROP INDEX `IDX_fe0bb3f6520ee0469504521e71` ON `users`");
        await queryRunner.query("DROP TABLE `users`");
    }

}
