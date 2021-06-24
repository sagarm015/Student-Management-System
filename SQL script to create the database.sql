create database stms;

use stms;

-- creating table admins

create table admins(
username varchar(10) Not null ,
passkey varchar(10) not null,
teacherID integer  Primary key auto_increment 
);

-- creating table class

create table class(
classID integer primary key,
teacherID integer ,
foreign key (teacherID) references admins(teacherID)
);

-- creating table students

create table students(
rollNumber varchar(8) Primary key,
APmarks integer,
COAmarks integer,
DBMSmarks integer,
OTAmarks integer,
Mmarks integer,
cgpa decimal(10,2)
);

-- creating table studetail

create table studetail(
roll varchar(8) primary key,
firstName varchar(15),
lastName varchar(15),
branch varchar(20),
dob datetime,
classID integer,
foreign key (classID) references class(classID)
);
