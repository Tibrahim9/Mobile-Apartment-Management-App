<?php

require_once('database.php');

// payments table: id, amount, description, date, tenant_id, status

class Payment {

    private $id, $amount, $description, $date, $tenant_id, $status;

    public function __construct($id=0, $amount=0, $description='', $date=null, $tenant_id=0, $status=0) {
        $this->id = $id;
        $this->amount = $amount;
        $this->description = $description;
        $this->date = $date;
        $this->tenant_id = $tenant_id;
        $this->status = $status;
    }

    // submit payment
    public function submit_payment() {

    }

    // view payment
    public function view_payments($tenant_id) {
        global $db;

        $payment = array();
        $payments = array();

        $sql = "select id, amount, description, date, status from payments where tenant_id = ?";
        if(!$stmt = $db->query($sql))
            return false;
        $stmt->bind_param('i', $tenant_id);
        $stmt->execute();
        $stmt->bind_result($id, $amount, $description, $date, $status);
        while($stmt->fetch()) {
            $date_timestamp = strtotime($date);
            $date = strftime('%D', $date_timestamp);

            array_push($payment, $id, $amount, $description, $date, $status);
            array_push($payments, $payment);
            $payment = array();
        }

        return $payments;
    }

    // update payment
    public function update_payment() {

    }

}

?>