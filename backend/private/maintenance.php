<?php

require_once('database.php');

// maintenance table: id, issue, description, status, date_requested, date_completed, tenant_id

class Maintenance {

    private $id, $area, $issue, $level, $date_requested, $date_completed, $tenant_id, $building_id;

    public function __construct($area='', $issue='', $level=0, $date_requested=null, $date_completed=null, $tenant_id=0, $building_id=0) {
        $this->area = $area;
        $this->issue = $issue;
        $this->level = $level;
        $this->date_requested = $date_requested;
        $this->date_completed = $date_completed;
        $this->tenant_id = $tenant_id;
        $this->building_id = $building_id;
    }
    public function submit_request() {
        global $db;

        $sql = 'insert into maintenance (area, issue, level, date_requested, date_completed, tenant_id, building_id, status) values (?, ?, ?, ?, ?, ?, ?, 1)';
        if(!$stmt = $db->query($sql))
            return false;
        $stmt->bind_param('ssissii', $this->area, $this->issue, $this->level, $this->date_requested, $this->date_created, $this->tenant_id, $this->building_id);
        if(!$stmt->execute())
            return false;
        return true;
    }
    public function view_open_requests($tenant_id) {
        global $db;

        $maintenance_request = array();
        $maintenance_requests = array();

        $sql = "select id, area, issue, level, status, date_requested, date_completed from maintenance where tenant_id = ? and not status = 4";
        if(!$stmt = $db->query($sql))
            return false;
        $stmt->bind_param('i', $tenant_id);
        $stmt->execute();
        $stmt->bind_result($id, $area, $issue, $level, $status, $date_requested, $date_completed);
        while($stmt->fetch()) {

            $date_requested_time_stamp = strtotime($date_requested);
            $date_requested = strftime('%D', $date_requested_time_stamp);

            array_push($maintenance_request, $id, $area, $issue, $level, $status, $date_requested, $date_completed);
            array_push($maintenance_requests, $maintenance_request);
            $maintenance_request = array();
        }
        return $maintenance_requests;
    }
    public function view_previous_requests($tenant_id) {
        global $db;

        $maintenance_request = array();
        $maintenance_requests = array();

        $sql = "select id, area, issue, level, status, date_requested, date_completed from maintenance where tenant_id = ? AND status = 4";
        if(!$stmt = $db->query($sql))
            return false;
        $stmt->bind_param('i', $tenant_id);
        $stmt->execute();
        $stmt->bind_result($id, $area, $issue, $level, $status, $date_requested, $date_completed);
        while($stmt->fetch()) {
            
            $date_completed_timestamp = strtotime($date_completed);
            $date_completed = strftime('%D', $date_completed_timestamp);

            array_push($maintenance_request, $id, $area, $issue, $level, $status, $date_requested, $date_completed);
            array_push($maintenance_requests, $maintenance_request);
            $maintenance_request = array();
        }
        return $maintenance_requests;
    }
    public function view_open_requests_manager($building_id) {
        global $db;

        $maintenance_request = array();
        $maintenance_requests = array();

        $sql = "select id, area, issue, level, status, date_requested, date_completed, tenant_id from maintenance where building_id = ? and not status = 4";
        if(!$stmt = $db->query($sql))
            return false;
        $stmt->bind_param('i', $building_id);
        $stmt->execute();
        $stmt->bind_result($id, $area, $issue, $level, $status, $date_requested, $date_completed, $tenant_id);
        while($stmt->fetch()) {

            $date_requested_time_stamp = strtotime($date_requested);
            $date_requested = strftime('%D', $date_requested_time_stamp);

            array_push($maintenance_request, $id, $area, $issue, $level, $status, $date_requested, $date_completed, $tenant_id);
            array_push($maintenance_requests, $maintenance_request);
            $maintenance_request = array();
        }

        for($i = 0; $i < count($maintenance_requests); $i++) {
            $tenant = self::get_tenant($maintenance_requests[$i][7]);
            array_push($maintenance_requests[$i], $tenant);
        }

        return $maintenance_requests;
    }
    public function view_previous_requests_manager($building_id) {
        global $db;

        $maintenance_request = array();
        $maintenance_requests = array();

        $sql = "select id, area, issue, level, status, date_requested, date_completed, tenant_id from maintenance where building_id = ? AND status = 4";
        if(!$stmt = $db->query($sql))
            return false;
        $stmt->bind_param('i', $building_id);
        $stmt->execute();
        $stmt->bind_result($id, $area, $issue, $level, $status, $date_requested, $date_completed, $tenant_id);
        while($stmt->fetch()) {

            $date_completed_timestamp = strtotime($date_completed);
            $date_completed = strftime('%D', $date_completed_timestamp);

            array_push($maintenance_request, $id, $area, $issue, $level, $status, $date_requested, $date_completed, $tenant_id);
            array_push($maintenance_requests, $maintenance_request);
            $maintenance_request = array();
        }

        for($i = 0; $i < count($maintenance_requests); $i++) {
            $tenant = self::get_tenant($maintenance_requests[$i][7]);
            array_push($maintenance_requests[$i], $tenant);
        }

        return $maintenance_requests;
    }
    public function update_request_status($id, $new_status) {
        global $db;

        if($new_status == 4) {

            $hour = 12;

            $today              = strtotime($hour . ':00:00');
            $yesterday          = strtotime('-1 day', $today);
            $dayBeforeYesterday = strtotime('-1 day', $yesterday);

            $date_completed = strftime('%F', $yesterday);
            
            $sql = "update maintenance set status = ?, date_completed = ? where id = ?";
            if(!$stmt = $db->query($sql))
                return false;
            $stmt->bind_param('isi', $new_status, $date_completed, $id);
            if(!$stmt->execute())
                return false;
            return true;
        }

        $sql = "update maintenance set status = ? where id = ?";
        if(!$stmt = $db->query($sql))
            return false;
        $stmt->bind_param('ii', $new_status, $id);
        if(!$stmt->execute())
            return false;
        return true;

    }
    public function remove_request($id) {
        global $db;

        $sql = "delete from maintenance where id = ?";
        if(!$stmt = $db->query($sql))
            return false;
        $stmt->bind_param('i', $id);
        if(!$stmt->execute())
            return false;
        return true;
    }
    private static function get_tenant($tenant_id)
    {
        global $db;

        $full_name = array();

        $sql = "select first_name, last_name from tenants where id = ?";
        if(!$stmt = $db->query($sql))
            return false;
        $stmt->bind_param('i', $tenant_id);
        $stmt->execute();
        $stmt->store_result();
        $stmt->bind_result($first_name, $last_name);
        $stmt->fetch();
        if($stmt->num_rows < 1)
            return false;
        array_push($full_name, $first_name, $last_name);

        return $full_name;
    }
}

?>