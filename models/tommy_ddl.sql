drop table users;

create table users (
    id int NOT NULL AUTO_INCREMENT,
    email varchar(255) not null,
    password varchar(255) not null,
    name varchar(255) not null,
    status tinyint(1) not null default 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by varchar(255),
    updated_by varchar(255),
    PRIMARY KEY (id),
    UNIQUE (email)
);


create table vendors (
    id int NOT NULL AUTO_INCREMENT,
    email varchar(255) not null,
    name varchar(255) not null,
    address text not null,
    status tinyint(1) not null default 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by varchar(255),
    updated_by varchar(255),
    PRIMARY KEY (id),
    UNIQUE (email)
);

create table entities (
    id int NOT NULL AUTO_INCREMENT,
    vendor_id int not null,
    name varchar(255) not null,
    code varchar(6) not null,
    type varchar(6) not null,
    status tinyint(1) not null default 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by varchar(255),
    updated_by varchar(255),
    PRIMARY KEY (id),
    UNIQUE (name,code),
    FOREIGN KEY (vendor_id) REFERENCES vendors(id)
);

create table records (
    id int NOT NULL AUTO_INCREMENT,
    entity_id int not null,
    col1 varchar(255) not null,
    col2 varchar(255) not null,
    col3 varchar(255) not null,
    col4 varchar(255) not null,
    status tinyint(1) not null default 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    created_by varchar(255),
    updated_by varchar(255),
    PRIMARY KEY (id),
    FOREIGN KEY (entity_id) REFERENCES entities(id)
);