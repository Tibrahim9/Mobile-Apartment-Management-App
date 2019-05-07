<?php

require_once('database.php');

// managers table: id, username, email, first_name, last_name, mobile_number, building_id

class Manager {

    private $id, $email, $first_name, $last_name, $building_id, $mobile_number;

    public function __construct($email='', $first_name='', $last_name='', $building_id=0, $mobile_number=0) {
        $this->email = $email;
        $this->first_name = $first_name;
        $this->last_name = $last_name;
        $this->building_id = $building_id;
        $this->mobile_number = $mobile_number;
    }

    public function check_manager() {
        global $db;

        $sql = 'select id from managers where email = ?';
        if(!$stmt = $db->query($sql))
            return false;
        $stmt->bind_param('s', $this->email);
        if(!$stmt->execute())
            return false;
        $stmt->store_result();
        if($stmt->num_rows < 1)
            return false;
        return true;
    }
    public function add_manager() {
        global $db;

        $sql = 'insert into managers (email, first_name, last_name, building_id, mobile_number) values (?, ?, ?, ?, ?)';
        if(!$stmt = $db->query($sql)) {
            return false;
        }
        $stmt->bind_param('sssii', $this->email, $this->first_name, $this->last_name, $this->building_id, $this->mobile_number);
        if(!$stmt->execute())
            return false;
        return true;
    }
    public function get_manager_info($email='') {
        global $db;

        $manager_info = array();

        $sql = "select id, first_name, last_name, mobile_number, building_id from managers where email = ?";
        if(!$stmt = $db->query($sql))
            return false;
        $stmt->bind_param('s', $email);
        if(!$stmt->execute())
            return false;
        $stmt->bind_result($this->id, $this->first_name, $this->last_name, $this->mobile_number, $this->building_id);
        $stmt->fetch();
        array_push($manager_info, $this->id, $this->first_name, $this->last_name, $this->mobile_number, $this->building_id);
        return $manager_info;
    }
}

?>