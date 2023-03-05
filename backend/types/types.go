package types

import (
	"gorm.io/gorm"
	"time"
)

type Patient struct {
	gorm.Model  // includes id (uint), createdAt, updatedAt (time), and DeletedAt
	CaretakerId string
	Name        string
	PhoneNumber string
}

type Caretaker struct {
	gorm.Model
	Name        string
	PhoneNumber string
	FirebaseId  string
}

type Schedule struct {
	gorm.Model
	PatientId int
	startDate time.Time
	endDate   time.Time
	Frequency int
}
