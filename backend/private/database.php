<?php

class Database {

    private $connection;

    // private $db_host = 'localhost';
    // private $db_user = 'nicholasbrodsky';
    // private $db_pass = 'password';
    // private $db_name = 'apartment_app';

    private $db_host = 'localhost';
    private $db_user = 'id8154842_comp490';
    private $db_pass = 'password';
    private $db_name = 'id8154842_apartment_app';

    // private $db_host = '127.0.0.1';
    // private $db_user = 'apartm57_user';
    // private $db_pass = 'password123';
    // private $db_name = 'apartm57_apartment_app';

    public function __construct() {
        $this->open_connection();
    }
    private function open_connection() {
        $this->connection = new mysqli($this->db_host, $this->db_user, $this->db_pass, $this->db_name);
        if($this->connection->connect_errno) {
            exit('Database connection failed');
        }
    }
    public function close_connection() {
        $this->connection->close();
    }
    public function query($sql) {
        $stmt = $this->connection->prepare($sql);
        return $stmt;
    }

}
$db = new Database();

?>
