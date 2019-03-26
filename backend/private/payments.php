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
    public function view_payments() {
        
    }

    // update payment
    public function update_payment() {

    }

}

?>