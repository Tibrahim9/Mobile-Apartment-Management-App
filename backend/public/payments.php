<?php

require_once('../private/payments.php');

header('Content-Type: application/json');

// payments table: id, amount, description, date, tenant_id, status

try {
    $json = file_get_contents('php://input');

    $obj = json_decode($json, true);

    $id = isset($obj['id']) ? $obj['id'] : 0;
    $amount = isset($obj['amount']) ? $obj['amount'] : 0;
    $description = isset($obj['description']) ? $obj['description'] : '';
    $date = isset($obj['date']) ? $obj['date'] : null;
    $tenant_id = isset($obj['tenant_id']) ? $obj['tenant_id'] : 0;
    $status = isset($obj['status']) ? $obj['status'] : 0;
    
    $option = isset($obj['option']) ? $obj['option'] : '';

    if($option = 'view_payments') {
        $payment = new Payment();
        if($payment_history = $payment->view_payments($tenant_id)) {
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
}
catch(Exception $e) {
    print json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}

?>