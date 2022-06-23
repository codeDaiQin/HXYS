package address

import (
	"HXYS/libs"
)

type Address struct {
	AddressId int    `gorm:"primary_key" json:"address_id"`
	Detailed  string `json:"detailed"`  // 详细地址
	Consignee string `json:"consignee"` // 收货人
	Phone     string `json:"phone"`     // 手机号``
	// IsDefault bool   `json:"is_default"` // 是否默认地址
}

// GetAddressList	获取地址列表
func GetAddressList() (addressList []Address, err error) {
	err = libs.Db.Find(&addressList).Error
	return
}

// GetAddressTotal 获取地址总数
func GetAddressTotal() (count int64) {
	libs.Db.Model(&Address{}).Count(&count)
	return
}

// AddAddress 新增地址
func AddAddress(detailed, consignee, phone string) (err error) {
	err = libs.Db.Create(&Address{
		Detailed:  detailed,
		Consignee: consignee,
		Phone:     phone,
	}).Error
	return
}

// DeleteAddress 删除地址
func DeleteAddress(addressId string) (err error) {
	//	删除地址
	err = libs.Db.Where("address_id = ?", addressId).Delete(&Address{}).Error
	return
}

// EditAddress 更新地址
func EditAddress(addressId string, detailed, consignee, phone string) (err error) {
	err = libs.Db.Model(&Address{}).Where("address_id = ?", addressId).Update("detailed", detailed).Update("consignee", consignee).Update("phone", phone).Error
	return
}
