-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 09, 2019 at 10:13 PM
-- Server version: 10.3.16-MariaDB
-- PHP Version: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `crm`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounttable`
--

CREATE TABLE `accounttable` (
  `accountemail` varchar(50) NOT NULL,
  `accountname` varchar(250) NOT NULL,
  `accountwebsite` varchar(250) NOT NULL,
  `accountphone1` bigint(20) NOT NULL,
  `accountphone2` bigint(20) NOT NULL,
  `accountbillingstreet` varchar(250) NOT NULL,
  `accountbillingcity` varchar(250) NOT NULL,
  `accountbillingstate` varchar(250) NOT NULL,
  `accountbillingpostal` bigint(20) NOT NULL,
  `accountbillingcountry` varchar(250) NOT NULL,
  `accountshippingstreet` varchar(250) NOT NULL,
  `accountshippingcity` varchar(250) NOT NULL,
  `accountshippingstate` varchar(250) NOT NULL,
  `accountshippingpostal` bigint(20) NOT NULL,
  `accountshippingcountry` varchar(250) NOT NULL,
  `accountType` varchar(250) NOT NULL,
  `accountGST` varchar(250) NOT NULL,
  `accountIndustry` varchar(250) NOT NULL,
  `accountDescription` varchar(1000) NOT NULL,
  `assigneduseremail` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `accounttable`
--

INSERT INTO `accounttable` (`accountemail`, `accountname`, `accountwebsite`, `accountphone1`, `accountphone2`, `accountbillingstreet`, `accountbillingcity`, `accountbillingstate`, `accountbillingpostal`, `accountbillingcountry`, `accountshippingstreet`, `accountshippingcity`, `accountshippingstate`, `accountshippingpostal`, `accountshippingcountry`, `accountType`, `accountGST`, `accountIndustry`, `accountDescription`, `assigneduseremail`) VALUES
('asdaddds@gmail.com', 'accc', '123123', 12, 11, ' 1', '21', '321', 21, '23', '123', '123', '1', 321, '23', 'Retailer', '223', 'Building Materials & Equipment', 'dd', 'rahuldshetty@gmail.com'),
('asdas@gmail.com', 'asfdsa', 'asdasd', 2332, 3, ' 312', '3123', '13', 1, '23', '123', '32', '21', 231, '231', 'Partner', '12', 'Automotive', 'desc', 'rahuldshetty@gmail.com'),
('asdghhh@gmail.com', 'asdasd', '1465', 1, 651, ' 616', '51', '65', 156, '156', '165', '165', '1', 651, '5', 'Retailer', '561', 'Biotechnology', 'f', 'rahuldshetty@gmail.com'),
('dcvcbcv@gmail.comn', 'rtygryr', '3', 43543, 435, ' 424', '45245', '45', 435, '4235', '425', '425', '532', 2345, '432', 'Partner', '435', 'Biotechnology', '', 'surabh@gmail.com'),
('fdgdfg@gmaul.com', 'cvbcfbv', '234', 324, 342, ' 23435', '45', '523', 4325, '3425', '3425', '235', '25', 4325, '3425', 'Partner', '34235', 'Building Materials & Equipment', 'vbnv', 'rahuldshetty@gmail.com'),
('rahul@gmail.com', 'rahul', 'sadas', 52121, 2, ' 312', '23', '121', 21, '231', '231', '12', '21', 31, '121', 'Investor', '21', 'Chemical', '', 'rahuldshetty@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `admintable`
--

CREATE TABLE `admintable` (
  `adminid` int(11) NOT NULL,
  `admintype` varchar(50) NOT NULL,
  `adminname` varchar(100) NOT NULL,
  `adminpass` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admintable`
--

INSERT INTO `admintable` (`adminid`, `admintype`, `adminname`, `adminpass`) VALUES
(1, 'Administrator', 'admin', '21232f297a57a5a743894a0e4a801fc3'),
(2, 'Administrator', 'suraj', '4dd49f4f84e4d6945e3bc6d14812004e'),
(3, 'Administrator', 'rahul', '439ed537979d8e831561964dbbbd7413'),
(4, 'Sales Manager', 'rahul', '439ed537979d8e831561964dbbbd7413');

-- --------------------------------------------------------

--
-- Table structure for table `callcontactattendees`
--

CREATE TABLE `callcontactattendees` (
  `callid` int(11) NOT NULL,
  `contemail` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `callcontactattendees`
--

INSERT INTO `callcontactattendees` (`callid`, `contemail`) VALUES
(50, 'rmm@gmail.com'),
(50, 'suraj@gmail.com'),
(52, 'rmm@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `calltable`
--

CREATE TABLE `calltable` (
  `id` int(11) NOT NULL,
  `callname` varchar(250) NOT NULL,
  `calldesc` varchar(1000) NOT NULL,
  `callparentname` varchar(50) NOT NULL,
  `callparentid` varchar(250) NOT NULL,
  `callstatus` varchar(50) NOT NULL,
  `calldirection` varchar(50) NOT NULL,
  `callstartdate` date NOT NULL,
  `callstarttime` time NOT NULL,
  `callenddate` date NOT NULL,
  `callendtime` time NOT NULL,
  `callduration` bigint(20) NOT NULL,
  `callemailstatus` bigint(20) NOT NULL,
  `assigneduser` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `calltable`
--

INSERT INTO `calltable` (`id`, `callname`, `calldesc`, `callparentname`, `callparentid`, `callstatus`, `calldirection`, `callstartdate`, `callstarttime`, `callenddate`, `callendtime`, `callduration`, `callemailstatus`, `assigneduser`) VALUES
(50, 'asdas', 'dasd', 'accounttable', 'fdgdfg@gmaul.com', 'Planned', 'Inbound', '2019-07-25', '17:41:00', '2019-07-22', '17:41:00', 60, 120, 'rahuldshetty@gmail.com'),
(52, 'nnmmms', 'adfdsdfg', 'contacttable', 'suraj@gmail.com', 'Planned', 'Outbound', '2019-07-23', '04:42:00', '2019-07-27', '16:42:00', 45, 60, 'surabh@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `calluserattendees`
--

CREATE TABLE `calluserattendees` (
  `callid` int(11) NOT NULL,
  `useremail` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `calluserattendees`
--

INSERT INTO `calluserattendees` (`callid`, `useremail`) VALUES
(50, 'surabh@gmail.com'),
(52, 'rahuldshetty@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `contacttable`
--

CREATE TABLE `contacttable` (
  `contemail` varchar(50) NOT NULL,
  `contname` varchar(50) NOT NULL,
  `contphone` bigint(20) NOT NULL,
  `contstreet` varchar(250) NOT NULL,
  `contcity` varchar(250) NOT NULL,
  `contstate` varchar(250) NOT NULL,
  `constpostal` bigint(20) NOT NULL,
  `constcountry` varchar(250) NOT NULL,
  `constdesc` varchar(1000) NOT NULL,
  `constaccountemail` varchar(50) NOT NULL,
  `constassigneduser` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `contacttable`
--

INSERT INTO `contacttable` (`contemail`, `contname`, `contphone`, `contstreet`, `contcity`, `contstate`, `constpostal`, `constcountry`, `constdesc`, `constaccountemail`, `constassigneduser`) VALUES
('rmm@gmail.com', 'Reevan', 65456465, '2312', '312', '23', 1231, '1231', 'dec', 'asdas@gmail.com', 'surabh@gmail.com'),
('suraj@gmail.com', 'Suraj', 911, 'street', 'city', 'state', 54654, '54654', 'desvc', 'rahul@gmail.com', 'surabh@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `parenttable`
--

CREATE TABLE `parenttable` (
  `name` varchar(50) NOT NULL,
  `parenttablename` varchar(50) NOT NULL,
  `parenttableid` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `parenttable`
--

INSERT INTO `parenttable` (`name`, `parenttablename`, `parenttableid`) VALUES
('Account', 'accounttable', 'accountemail'),
('Contact', 'contacttable', 'contemail');

-- --------------------------------------------------------

--
-- Table structure for table `roletable`
--

CREATE TABLE `roletable` (
  `roleid` int(11) NOT NULL,
  `rolename` varchar(50) NOT NULL,
  `teamid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `roletable`
--

INSERT INTO `roletable` (`roleid`, `rolename`, `teamid`) VALUES
(1, 'Sales', 1),
(2, 'Sales Manager', 1),
(3, 'Support', 3),
(4, 'Support Manager', 3);

-- --------------------------------------------------------

--
-- Table structure for table `tasktable`
--

CREATE TABLE `tasktable` (
  `taskid` int(11) NOT NULL,
  `taskname` varchar(250) NOT NULL,
  `taskparent` varchar(20) NOT NULL,
  `tasktarget` varchar(100) NOT NULL,
  `taskstartdate` date NOT NULL,
  `taskstarttime` time NOT NULL,
  `taskenddate` date NOT NULL,
  `taskendtime` time NOT NULL,
  `taskstatus` varchar(50) NOT NULL,
  `taskpriority` varchar(50) NOT NULL,
  `taskdescription` varchar(350) NOT NULL,
  `taskuseremail` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `teamtable`
--

CREATE TABLE `teamtable` (
  `teamid` int(11) NOT NULL,
  `teamname` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `teamtable`
--

INSERT INTO `teamtable` (`teamid`, `teamname`) VALUES
(1, 'Sales Department'),
(2, 'Service'),
(3, 'Support');

-- --------------------------------------------------------

--
-- Table structure for table `userroletable`
--

CREATE TABLE `userroletable` (
  `useremail` varchar(50) NOT NULL,
  `roleid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `userroletable`
--

INSERT INTO `userroletable` (`useremail`, `roleid`) VALUES
('rahuldshetty@gmail.com', 4),
('surabh@gmail.com', 1);

-- --------------------------------------------------------

--
-- Table structure for table `usertable`
--

CREATE TABLE `usertable` (
  `useremail` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `userphone` bigint(20) NOT NULL,
  `usergender` varchar(10) NOT NULL,
  `userpassword` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `usertable`
--

INSERT INTO `usertable` (`useremail`, `username`, `userphone`, `usergender`, `userpassword`) VALUES
('rahuldshetty@gmail.com', 'Rahul D Shetty', 9483913464, 'Male', '123'),
('surabh@gmail.com', 'Saurabh', 123, 'Male', 'password');

-- --------------------------------------------------------

--
-- Table structure for table `userteamtable`
--

CREATE TABLE `userteamtable` (
  `useremail` varchar(50) NOT NULL,
  `teamid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `userteamtable`
--

INSERT INTO `userteamtable` (`useremail`, `teamid`) VALUES
('rahuldshetty@gmail.com', 3),
('surabh@gmail.com', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounttable`
--
ALTER TABLE `accounttable`
  ADD PRIMARY KEY (`accountemail`),
  ADD KEY `assigneduseremail` (`assigneduseremail`);

--
-- Indexes for table `admintable`
--
ALTER TABLE `admintable`
  ADD PRIMARY KEY (`adminid`);

--
-- Indexes for table `callcontactattendees`
--
ALTER TABLE `callcontactattendees`
  ADD PRIMARY KEY (`callid`,`contemail`),
  ADD KEY `callcontactattendees_ibfk_2` (`contemail`);

--
-- Indexes for table `calltable`
--
ALTER TABLE `calltable`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userassignedcallfk` (`assigneduser`),
  ADD KEY `callparentname` (`callparentname`);

--
-- Indexes for table `calluserattendees`
--
ALTER TABLE `calluserattendees`
  ADD PRIMARY KEY (`callid`,`useremail`),
  ADD KEY `calluserattendees_ibfk_2` (`useremail`);

--
-- Indexes for table `contacttable`
--
ALTER TABLE `contacttable`
  ADD PRIMARY KEY (`contemail`),
  ADD KEY `contactone` (`constassigneduser`),
  ADD KEY `conttwo` (`constaccountemail`);

--
-- Indexes for table `parenttable`
--
ALTER TABLE `parenttable`
  ADD PRIMARY KEY (`parenttablename`);

--
-- Indexes for table `roletable`
--
ALTER TABLE `roletable`
  ADD PRIMARY KEY (`roleid`),
  ADD KEY `teamidfk` (`teamid`);

--
-- Indexes for table `tasktable`
--
ALTER TABLE `tasktable`
  ADD PRIMARY KEY (`taskid`),
  ADD KEY `taskuserfk` (`taskuseremail`);

--
-- Indexes for table `teamtable`
--
ALTER TABLE `teamtable`
  ADD PRIMARY KEY (`teamid`);

--
-- Indexes for table `userroletable`
--
ALTER TABLE `userroletable`
  ADD KEY `fkroleiduser` (`roleid`),
  ADD KEY `fkuseremail` (`useremail`);

--
-- Indexes for table `usertable`
--
ALTER TABLE `usertable`
  ADD PRIMARY KEY (`useremail`);

--
-- Indexes for table `userteamtable`
--
ALTER TABLE `userteamtable`
  ADD KEY `utfkteamid` (`teamid`),
  ADD KEY `utfkuseremail` (`useremail`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admintable`
--
ALTER TABLE `admintable`
  MODIFY `adminid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `calltable`
--
ALTER TABLE `calltable`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `roletable`
--
ALTER TABLE `roletable`
  MODIFY `roleid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tasktable`
--
ALTER TABLE `tasktable`
  MODIFY `taskid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `teamtable`
--
ALTER TABLE `teamtable`
  MODIFY `teamid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `accounttable`
--
ALTER TABLE `accounttable`
  ADD CONSTRAINT `accounttable_ibfk_1` FOREIGN KEY (`assigneduseremail`) REFERENCES `usertable` (`useremail`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `callcontactattendees`
--
ALTER TABLE `callcontactattendees`
  ADD CONSTRAINT `callcontactattendees_ibfk_1` FOREIGN KEY (`callid`) REFERENCES `calltable` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `callcontactattendees_ibfk_2` FOREIGN KEY (`contemail`) REFERENCES `contacttable` (`contemail`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `calltable`
--
ALTER TABLE `calltable`
  ADD CONSTRAINT `calltable_ibfk_1` FOREIGN KEY (`callparentname`) REFERENCES `parenttable` (`parenttablename`) ON UPDATE CASCADE,
  ADD CONSTRAINT `userassignedcallfk` FOREIGN KEY (`assigneduser`) REFERENCES `usertable` (`useremail`) ON UPDATE CASCADE;

--
-- Constraints for table `calluserattendees`
--
ALTER TABLE `calluserattendees`
  ADD CONSTRAINT `calluserattendees_ibfk_1` FOREIGN KEY (`callid`) REFERENCES `calltable` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `calluserattendees_ibfk_2` FOREIGN KEY (`useremail`) REFERENCES `usertable` (`useremail`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `contacttable`
--
ALTER TABLE `contacttable`
  ADD CONSTRAINT `contactone` FOREIGN KEY (`constassigneduser`) REFERENCES `usertable` (`useremail`) ON UPDATE CASCADE,
  ADD CONSTRAINT `conttwo` FOREIGN KEY (`constaccountemail`) REFERENCES `accounttable` (`accountemail`) ON UPDATE CASCADE;

--
-- Constraints for table `roletable`
--
ALTER TABLE `roletable`
  ADD CONSTRAINT `teamidfk` FOREIGN KEY (`teamid`) REFERENCES `teamtable` (`teamid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `tasktable`
--
ALTER TABLE `tasktable`
  ADD CONSTRAINT `taskuserfk` FOREIGN KEY (`taskuseremail`) REFERENCES `usertable` (`useremail`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `userroletable`
--
ALTER TABLE `userroletable`
  ADD CONSTRAINT `fkroleiduser` FOREIGN KEY (`roleid`) REFERENCES `roletable` (`roleid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fkuseremail` FOREIGN KEY (`useremail`) REFERENCES `usertable` (`useremail`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `userteamtable`
--
ALTER TABLE `userteamtable`
  ADD CONSTRAINT `utfkteamid` FOREIGN KEY (`teamid`) REFERENCES `teamtable` (`teamid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `utfkuseremail` FOREIGN KEY (`useremail`) REFERENCES `usertable` (`useremail`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
