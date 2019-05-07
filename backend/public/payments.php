<?php

require_once('../private/payments.php');

header('Content-Type: application/json');

// payments table: id, amount, description, due_date, date_submitted, status, tenant_id, building_id

try {
    $json = file_get_contents('php://input');

    $obj = json_decode($json, true);

    $id = isset($obj['id']) ? $obj['id'] : 0;
    $amount = isset($obj['amount']) ? $obj['amount'] : 0;
    $description = isset($obj['description']) ? $obj['description'] : '';
    $due_date = isset($obj['due_date']) ? $obj['due_date'] : null;
    $date_submitted = isset($obj['date_submitted']) ? $obj['date_submitted'] : null;
    $tenant_id = isset($obj['tenant_id']) ? $obj['tenant_id'] : 0;
    $status = isset($obj['status']) ? $obj['status'] : 0;
    $building_id = isset($obj['building_id']) ? $obj['building_id'] : 0;
    $new_status = isset($obj['new_status']) ? $obj['new_status'] : 0;

    $option = isset($obj['option']) ? $obj['option'] : '';


    // $option = isset($_GET['option']) ? $_GET['option'] : 'view_payments';
    // $tenant_id = isset($_GET['tenant_id']) ? $_GET['tenant_id'] : 8;

    if($option === 'request_payment') {
        $payment = new Payment($amount, $description, $due_date, $tenant_id);
        if(!$payment->request_payment()) {
            print json_encode([
                'success' => false,
                'message' => 'Failed to submit payment request'
            ]);
            exit;
        }
        print json_encode([
            'success' => true,
            'message' => 'submitted payment request'
        ]);
        exit;
    }

    if($option === 'submit_payment') {
        $payment = new Payment();
        if(!$payment->submit_payment($id, $date_submitted)) {
            print json_encode([
                'success' => false,
                'message' => 'Failed to submit payment'
            ]);
            exit;
        }
        print json_encode([
            'success' => true,
            'message' => 'submitted payment'
        ]);
        exit;
    }
    
    if($option === 'view_payment_requests') {
        $payment = new Payment();
        if($payment_requests = $payment->view_payment_requests($tenant_id)) {
            print json_encode([
                'success' => true,
                'payment_requests' => $payment_requests
            ]);
            exit;
        }
        print json_encode([
            'success' => false,
            'message' => 'Failed to view payment requests'
        ]);
        exit;
    }

    if($option === 'view_payment_history') {
        $payment = new Payment();
        if($payment_history = $payment->view_payment_history($tenant_id)) {
            print json_encode([
                'success' => true,
                'payment_history' => $payment_history
            ]);
            exit;
        }
        print json_encode([
            'success' => false,
            'message' => 'Failed to view payment history'
        ]);
        exit;
    }
    
    if($option === 'view_payments_manager') {
        $payment = new Payment();
        $open_payments = $payment->view_open_payments_manager($building_id);
        $closed_payments = $payment->view_closed_payments_manager($building_id);
        if($open_payments || $closed_payments) {
            print json_encode([
                'success' => true,
                'open_payments' => $open_payments,
                'closed_payments' => $closed_payments
            ]);
            exit;
        }
        print json_encode([
            'success' => false,
            'message' => 'Failed to view open/closed payments'
        ]);
        exit;
    }

    if($option === 'update_payment_status') {
        $payment = new Payment();
        if(!$payment->update_payment($id, $new_status)) {
            print json_encode([
                'success' => false,
                'message' => 'Failed to update payment status'
            ]);
            exit;
        }
        print json_encode([
            'success' => true
        ]);
        exit;
    }
    if($option === 'remove_payment') {
        $payment = new Payment();
        if(!$payment->remove_payment($id)) {
            print json_encode([
                'success' => false,
                'message' => 'Failed to remove payment'
            ]);
            exit;
        }
        print json_encode([
            'success' => true
        ]);
        exit;
    }
}
catch(Exception $e) {
    print json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}

?>