<?php

require_once('database.php');

// payments table: id, amount, description, due_date, date_submitted, status, tenant_id, building_id

class Payment {

    private $id, $amount, $description, $due_date, $date_submitted, $status, $tenant_id, $building_id;

    public function __construct($amount=0, $description='', $due_date=null, $tenant_id=0, $status=1, $building_id=1, $date_submitted=null, $id=0) {
        $this->id = $id;
        $this->amount = $amount;
        $this->description = $description;
        $this->due_date = $due_date;
        $this->date_submitted = $date_submitted;
        $this->tenant_id = $tenant_id;
        $this->status = $status;
        $this->building_id = $building_id;
    }

    // request payment
    public function request_payment() {
        global $db;

        $sql = "insert into payments (amount, description, due_date, tenant_id, status, building_id) values (?, ?, ?, ?, 1, 1)";
        if(!$stmt = $db->query($sql))
            return false;
        $stmt->bind_param('issi', $this->amount, $this->description, $this->due_date, $this->tenant_id);
        if(!$stmt->execute())
            return false;
        return true;
    }
    
    public function submit_payment($id, $date_submitted)
    {
        global $db;

        $sql = "update payments set date_submitted = ?, status = 2 where id = ?";
        if(!$stmt = $db->query($sql))
            return false;
        $stmt->bind_param('si', $date_submitted, $id);
        if(!$stmt->execute())
            return false;
        return true;
    }

    // view open payment requests
    public function view_payment_requests($tenant_id)
    {
        global $db;

        $payment = array();
        $payments = array();

        $sql = "select id, amount, description, due_date from payments where tenant_id = ? and status = 1";
        if(!$stmt = $db->query($sql))
            return false;
        $stmt->bind_param('i', $tenant_id);
        $stmt->execute();
        $stmt->bind_result($id, $amount, $description, $due_date);
        while($stmt->fetch()) {
            $date_timestamp = strtotime($due_date);
            $due_date = strftime('%D', $date_timestamp);

            array_push($payment, $id, $amount, $description, $due_date);
            array_push($payments, $payment);
            $payment = array();
        }

        return $payments;
    }

    // view payment history
    public function view_payment_history($tenant_id) {
        global $db;

        $payment = array();
        $payments = array();

        $sql = "select id, amount, description, date_submitted, status from payments where tenant_id = ? and not status = 1";
        if(!$stmt = $db->query($sql))
            return false;
        $stmt->bind_param('i', $tenant_id);
        $stmt->execute();
        $stmt->bind_result($id, $amount, $description, $date_submitted, $status);
        while($stmt->fetch()) {
            $date_timestamp = strtotime($date_submitted);
            $date_submitted = strftime('%D', $date_timestamp);

            array_push($payment, $id, $amount, $description, $date_submitted, $status);
            array_push($payments, $payment);
            $payment = array();
        }

        return $payments;
    }

    public function view_open_payments_manager($building_id)
    {
        global $db;

        $payment = array();
        $payments = array();
        $tenant = array();

        $sql = "select id, amount, description, due_date, status, tenant_id from payments where building_id = ? and status = 1";
        if(!$stmt = $db->query($sql))
            return false;
        $stmt->bind_param('i', $building_id);
        $stmt->execute();
        $stmt->bind_result($id, $amount, $description, $due_date, $status, $tenant_id);
        while($stmt->fetch()) {

            $date_timestamp = strtotime($due_date);
            $due_date = strftime('%D', $date_timestamp);

            array_push($payment, $id, $amount, $description, $due_date, $status, $tenant_id);
            array_push($payments, $payment);
            $payment = array();
        }
        $stmt->free_result();

        for($i = 0; $i < count($payments); $i++) {
            $tenant = self::get_tenant($payments[$i][5]);
            array_push($payments[$i], $tenant);
        }

        return $payments;
    }
    public function view_closed_payments_manager($building_id)
    {
        global $db;

        $payment = array();
        $payments = array();
        $tenant = array();

        $sql = "select id, amount, description, date_submitted, status, tenant_id from payments where building_id = ? and not status = 1";
        if(!$stmt = $db->query($sql))
            return false;
        $stmt->bind_param('i', $building_id);
        $stmt->execute();
        $stmt->bind_result($id, $amount, $description, $date_submitted, $status, $tenant_id);
        while($stmt->fetch()) {

            $date_timestamp = strtotime($date_submitted);
            $date_submitted = strftime('%D', $date_timestamp);

            array_push($payment, $id, $amount, $description, $date_submitted, $status, $tenant_id);
            array_push($payments, $payment);
            $payment = array();
        }
        $stmt->free_result();

        for($i = 0; $i < count($payments); $i++) {
            $tenant = self::get_tenant($payments[$i][5]);
            array_push($payments[$i], $tenant);
        }
        
        return $payments;
    }

    // update payment
    public function update_payment($id, $new_status) {
        global $db;

        $sql = "update payments set status = ? where id = ?";
        if(!$stmt = $db->query($sql))
            return false;
        $stmt->bind_param('ii', $new_status, $id);
        if(!$stmt->execute())
            return false;
        return true;
    }

    public function remove_payment($id) {
        global $db;

        $sql = "delete from payments where id = ?";
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
        // $first_name = "Nicholas";
        // $last_name = "Brodsky";
        array_push($full_name, $first_name, $last_name);

        return $full_name;
    }

}

?>