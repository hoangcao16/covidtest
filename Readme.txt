

Có 4 role:
- Đón tiếp
- Thu ngân
- Lấy mẫu
- Kỹ thuật viên
- Quản trị viên

- Đón tiếp: Các quyền
 + Tạo mới bệnh nhận: NHAP_THONG_TIN_BN
 + Phiếu xét:
     + Tạo được phiếu xét nghiệm:  NHAP_THONG_TIN_XN
        + Disbaled: Các trường: kết quả, kết luận, Kết luận Tiếng anh, Thời gian thực hiện, trạng thái: Chưa đóng tiền
        + Còn lại các trường khác đều được sửa
 - Role: Thu ngân
   + Sửa số tiền, + Đổi trạng thái --> Đã đóng tiền: SUA_TIEN
   + In ra phiếu thu: IN_PHIEU_THU

 - Role: Kỹ thuật viên:

   + Sửa các trường: kết quả, kết luận, Kết luận Tiếng anh, Thời gian thực hiện, trạng thái: Chưa đóng tiền:
   + Cập nhật tình trạng lấy mẫu: NHAP_THONG_TIN_KET_QUA

   + Các trường khác ko được sửa
   + Đổi các trạng thái


- Admin:



Tóm lại có:

  + QL_THONG_TIN_BN
  + QL_THONG_TIN_XN
  + SUA_TIEN
  + QL_THONG_TIN_KET_QUA
  + CAU_HINH_DANH_MUC
  + QL_USER
  + QL_PHIEU_THU
  + XEM_BAO_CAO
  + XEM_CONG_NO
