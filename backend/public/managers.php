<?php

require_once('../private/managers.php');

header('Content-Type: application/json');

// tenants table: id, email, first_name, last_name, building_id, mobile_number, room_number

try {
    $json = file_get_contents('php://input');

    $obj = json_decode($json, true);
    $manager_id = isset($obj['manager_id']) ? $obj['manager_id'] : 0;
    $email = isset($obj['email']) ? $obj['email'] : '';
    $first_name = isset($obj['first_name']) ?  $obj['first_name'] : '';
    $last_name = isset($obj['last_name']) ?  $obj['last_name'] : '';
    $building_id = isset($obj['building_id']) ?  $obj['building_id'] : 1;
    $mobile_number = isset($obj['mobile_number']) ? $obj['mobile_number'] : 0;
    
    $option = isset($obj['option']) ? $obj['option'] : '';

    if($option == 'check_manager') {
        $manager = new Manager($email);
        if(!$manager->check_manager()) {
            print json_encode([
                'success' => false,
                'message' => 'User is not a manager'
            ]);
            exit;
        }
        print json_encode([
            'success' => true
        ]);
        exit;
    }
    if($option == 'add_manager') {
        $manager = new Manager($email, $first_name, $last_name, $building_id, $mobile_number);
        if(!$manager->add_manager()) {
            print json_encode([
                'success' => false,
                'message' => 'Failed to add manager'
            ]);
            exit;
        }
        print json_encode([
            'success' => true
        ]);
        exit;
    }
    if($option == 'get_manager_info') {
        $manager = new Manager();
        
        if(!$manager_info = $manager->get_manager_info($email)) {
            print json_encode([
                'success' => false,
                'message' => 'Failed to get manager info'
            ]);
            exit;
        }
        print json_encode([
            'success' => true,
            'manager_info' => $manager_info
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