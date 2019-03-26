<?php

require_once('../private/maintenance.php');

header('Content-Type: application/json');

// maintenance table: id, area, issue, level, status, date_requested, date_completed, tenant_id, building_id

try {
    $json = file_get_contents('php://input');

    $obj = json_decode($json, true);

    $id = isset($obj['id']) ? $obj['id'] : 0;
    $issue = isset($obj['issue']) ? $obj['issue'] : '';
    $area = isset($obj['area']) ? $obj['area'] : '';
    $level = isset($obj['level']) ? $obj['level'] : '';
    $status = isset($obj['status']) ? $obj['status'] : 0;
    $new_status = isset($obj['new_status']) ? $obj['new_status'] : 0;
    $date_requested = isset($obj['date_requested']) ? $obj['date_requested'] : null;
    $date_completed = isset($obj['date_completed']) ? $obj['date_completed'] : null;
    $tenant_id = isset($obj['tenant_id']) ? $obj['tenant_id'] : '';
    $building_id = isset($obj['building_id']) ? $obj['building_id'] : 0;

    $option = isset($obj['option']) ?  $obj['option'] : '';

    if($option == 'submit_request') {
        $hour = 12;

        $today              = strtotime($hour . ':00:00');
        $yesterday          = strtotime('-1 day', $today);
        $dayBeforeYesterday = strtotime('-1 day', $yesterday);

        $date_requested = strftime('%F', $yesterday);

        $maintenance = new Maintenance($area, $issue, $level, $date_requested, $date_completed, $tenant_id, $building_id);
        if(!$maintenance->submit_request()) {
            print json_encode([
                'success' => false,
                'message' => 'Failed to submit maintenance request'
            ]);
            exit;
        }
        print json_encode([
            'success' => true
        ]);
        exit;
    }

    if($option == 'view_requests') {
        $maintenance = new Maintenance();
        $open_maintenance_requests = $maintenance->view_open_requests($tenant_id);
        $previous_maintenance_requests = $maintenance->view_previous_requests($tenant_id);
        if($previous_maintenance_requests || $open_maintenance_requests) {
            print json_encode([
                'success' => true,
                'open_maintenance_requests' => $open_maintenance_requests,
                'previous_maintenance_requests' => $previous_maintenance_requests
            ]);
            exit;
        }
        print json_encode([
            'success' => false,
            'message' => 'Failed to view maintenance requests'
        ]);
        exit;
    }
    if($option == 'view_requests_manager') {
        $maintenance = new Maintenance();
        $open_maintenance_requests = $maintenance->view_open_requests_manager($building_id);
        $previous_maintenance_requests = $maintenance->view_previous_requests_manager($building_id);
        if($previous_maintenance_requests || $open_maintenance_requests) {
            print json_encode([
                'success' => true,
                'open_maintenance_requests' => $open_maintenance_requests,
                'previous_maintenance_requests' => $previous_maintenance_requests
            ]);
            exit;
        }
        print json_encode([
            'success' => false,
            'message' => 'Failed to view maintenance requests'
        ]);
        exit;
    }
    if($option == 'update_request_status') {
        $maintenance = new Maintenance();
        if(!$maintenance->update_request_status($id, $new_status)) {
            print json_encode([
                'success' => false,
                'message' => 'Failed to update maintenance request status'
            ]);
            exit;
        }
        print json_encode([
            'success' => true
        ]);
    }
    if($option == 'remove_request') {
        $maintenance = new Maintenance();
        if(!$maintenance->remove_request($id)) {
            print json_encode([
                'success' => false,
                'message' => 'Failed to remove maintenance request'
            ]);
            exit;
        }
        print json_encode([
            'success' => true
        ]);
    }
}
catch(Exception $e) {
    print json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}

?>
