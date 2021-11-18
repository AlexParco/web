package conection

import (
	"database/sql"
	"log"

	_ "github.com/go-sql-driver/mysql"
)


func GetConection() *sql.DB {
	db, err := sql.Open("mysql", "root:password123@tcp(localhost:3306)/tests")

    if err != nil {
        log.Fatalf("Fatal error %v", err)
        return nil
    }

    return db
}

