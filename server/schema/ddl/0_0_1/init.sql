CREATE DATABASE werewolf CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `werewolf`.`room` (
  `id` INT(11) NOT NULL AUTO_INCREMENT COMMENT '房间号',
  `code` VARCHAR(45) NOT NULL DEFAULT '123456' COMMENT '加入码',
  `owner_openid` VARCHAR(200) NOT NULL COMMENT '房主的openid',
  PRIMARY KEY (`id`),
  UNIQUE INDEX `owner_openid_UNIQUE` (`owner_openid` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `werewolf`.`roles` (
  `id` INT(32) NOT NULL,
  `room_id` INT(11) NOT NULL,
  `role_name` VARCHAR(45) NOT NULL DEFAULT '平民' COMMENT '角色名',
  `enabled` INT(11) NOT NULL DEFAULT 0 COMMENT '是否使用中（0.否；1.是）',
  `player_openid` VARCHAR(200) NULL DEFAULT NULL COMMENT '玩家的openid',
  PRIMARY KEY (`id`),
  INDEX `fk_roles_room_idx` (`room_id` ASC),
  CONSTRAINT `fk_roles_room`
    FOREIGN KEY (`room_id`)
    REFERENCES `werewolf`.`room` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;