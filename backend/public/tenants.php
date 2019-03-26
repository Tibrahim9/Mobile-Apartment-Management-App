<?php

require_once('../private/tenants.php');

header('Content-Type: application/json');

// tenants table: id, email, first_name, last_name, building_id, mobile_number, room_number

try {
    $json = file_get_contents('php://input');

    $obj = json_decode($json, true);
    $tenant_id = isset($obj['tenant_id']) ? $obj['tenant_id'] : 0;
    $email = isset($obj['email']) ? $obj['email'] : '';
    $first_name = isset($obj['first_name']) ?  $obj['first_name'] : '';
    $last_name = isset($obj['last_name']) ?  $obj['last_name'] : '';
    $building_id = isset($obj['building_id']) ?  $obj['building_id'] : '';
    $mobile_number = isset($obj['mobile_number']) ? $obj['mobile_number'] : '';
    $room_number = isset($obj['room_number']) ? $obj['room_number'] : '';
    
    $option = isset($obj['option']) ? $obj['option'] : '';

    if($option == 'add_tenant') {
        $tenant = new Tenant($email, $first_name, $last_name, $building_id, $mobile_number, $room_number);
        if(!$tenant->add_tenant()) {
            print json_encode([
                'success' => false,
                'message' => 'Failed to add tenant'
            ]);
            exit;
        }
        print json_encode([
            'success' => true
        ]);
        exit;
    }
    if($option == 'get_tenant_info') {
        $tenant = new Tenant();
        
        if(!$tenant_info = $tenant->get_tenant_info($email)) {
            print json_encode([
                'success' => false,
                'message' => 'Failed to get tenant info'
            ]);
            exit;
        }
        print json_encode([
            'success' => true,
            'tenant_info' => $tenant_info
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