// Extracted participants from groups CSV
// Groups 1-6 with their nicknames

const PARTICIPANTS = [
    // Group 1
    { group: 1, fullName: 'นายเขตต์โสภณ โพธิ์คำ', nickname: 'ก็อต', phone: '092-879-4412', pin: 'K7X2' },
    { group: 1, fullName: 'น.ส. ชญานิศ กัปโก', nickname: 'เนย', phone: '097-028-5618', pin: 'M3R9' },
    { group: 1, fullName: 'นายคามิน อ่อนทอง', nickname: 'ม่อน', phone: '083-018-0180', pin: 'P4W1' },
    { group: 1, fullName: 'นางสาวณัฐสินี อุทัยทวีทิพย์', nickname: 'เฟย์', phone: '098-425-3415', pin: 'Q8N5' },
    { group: 1, fullName: 'นางสาวนิชา อำพันทอง', nickname: 'นิชา', phone: '095-435-6282', pin: 'B2L7' },
    { group: 1, fullName: 'นาย คุณานนท์ ประสาททอง', nickname: 'แฮรี่', phone: '089-744-4144', pin: 'T9V4' },
    { group: 1, fullName: 'นางสาวแสนสิริ ภูมิสิทธิ์', nickname: 'ใบพลู', phone: '095-552-9877', pin: 'H1D6' },

    // Group 2
    { group: 2, fullName: 'น.ส. นภัสนันท์ ค้าเจริญ', nickname: 'เฟิร์น', phone: '098-102-1255', pin: 'C5Z3' },
    { group: 2, fullName: 'นาย กันติภัช อันชะนะ', nickname: 'บูม', phone: '091-035-6191', pin: 'J8K1' },
    { group: 2, fullName: 'นายกฤษณ์ฏิภูมิ สุทธิศีลคุณ', nickname: 'การ์ฟิลด์', phone: '082-815-3470', pin: 'G2F7' },
    { group: 2, fullName: 'นางสาวสุทาทิพย์ รอดหลัก', nickname: 'หมิว', phone: '095-794-3852', pin: 'X4P9' },
    { group: 2, fullName: 'นายปิยวัฒน์ สุวรรณคำ', nickname: 'อิฐ', phone: '064-135-9842', pin: 'Y6R0' },
    { group: 2, fullName: 'นางสาวภรณ์ชนก เสริมทรัพย์', nickname: 'ไอติม', phone: '083-230-9524', pin: 'L3M8' },

    // Group 3
    { group: 3, fullName: 'นางสาวปาณิศา เกียรติ์มนตรี', nickname: 'พริ้นเซส', phone: '083-932-6598', pin: 'S7A2' },
    { group: 3, fullName: 'น.ส. บุณณ์ดา พานิชกุล', nickname: 'แน่', phone: '098-369-6950', pin: 'W5Q4' },
    { group: 3, fullName: 'จักริน ลิ้มป์อุดม', nickname: 'บีม', phone: '064-664-6857', pin: 'E1T6' },
    { group: 3, fullName: 'นายวรรธนัย เนตรเกื้อกิจ', nickname: 'เอม', phone: '081-173-5942', pin: 'R9V3' },
    { group: 3, fullName: 'นายพัสกร อำพรัตน์', nickname: 'โอม', phone: '092-654-8747', pin: 'D2N8' },
    { group: 3, fullName: 'นาย กันตินันท์ ทอธราเมธา', nickname: 'กันต์', phone: '064-702-1265', pin: 'F4U1' },

    // Group 4
    { group: 4, fullName: 'นางสาวชนากานต์ เครือประสิทธิ์', nickname: 'เฟรชชี่', phone: '083-715-3686', pin: 'V7H9' },
    { group: 4, fullName: 'นางสาวรุจาภา สันติวสุธา', nickname: 'เพลง', phone: '081-466-0276', pin: 'Z3B5' },
    { group: 4, fullName: 'นางสาวณัฐชญา ชาวบ้านกร่าง', nickname: 'เกรซ', phone: '099-035-9912', pin: 'N2K7' },
    { group: 4, fullName: 'น.ส. ชนกนันท์ มาศจำรัส', nickname: 'ส้มแขก', phone: '063-661-2973', pin: 'I8C1' },
    { group: 4, fullName: 'นาย ภคิน เควิน ชาน', nickname: 'เควิน', phone: '089-980-0183', pin: 'O5J4' },
    { group: 4, fullName: 'นายพีรพัฒน์ คาวิน', nickname: 'มิก', phone: '096-419-9742', pin: 'U6P0' },

    // Group 5
    { group: 5, fullName: 'นางสาวดุจมาดา ทนันชัย', nickname: 'มิ้งค์', phone: '087-603-6819', pin: 'A3X8' },
    { group: 5, fullName: 'นายนันทพงศ์ ศรีกระสังข์', nickname: 'เวนัส', phone: '065-475-2825', pin: 'S9W2' },
    { group: 5, fullName: 'นายจิรวัฒน์ ประเทืองทิพย์', nickname: 'ฟิว', phone: '094-447-1519', pin: 'T4Y6' },
    { group: 5, fullName: 'น.ส. ญาณิศา วงษ์ท่าเรือ', nickname: 'แพงจัง', phone: '091-995-3680', pin: 'G1D7' },
    { group: 5, fullName: 'น.ส. ภาวิดา ผุสดีโสภณ', nickname: 'แพร', phone: '090-229-9415', pin: 'M5F3' },
    { group: 5, fullName: 'นางสาวรสสุคนธ์ สุดใจ', nickname: 'ปุ๊บปั๊บ', phone: '094-504-3625', pin: 'P8L9' },

    // Group 6
    { group: 6, fullName: 'นางสาวธัญญ์ภคพร ทีฆวิวรรธน์', nickname: 'มิ้น', phone: '087-641-7575', pin: 'C2E5' },
    { group: 6, fullName: 'นาย ภธนน ชื่นอารมย์', nickname: 'โชกุน', phone: '098-968-3055', pin: 'H7R1' },
    { group: 6, fullName: 'นายเดชาธร เทพจันอัฒน์', nickname: 'โอเว่น', phone: '095-170-6317', pin: 'B4Q8' },
    { group: 6, fullName: 'นางสาวพิมพ์ปวีณ์ เพชรเจริญ', nickname: 'หมี่หยก', phone: '086-034-6309', pin: 'J9N3' },
    { group: 6, fullName: 'นาย จิรวัฒน์ เจริญวัฒนเมธา', nickname: 'ปลื้ม', phone: '065-535-9637', pin: 'K6V0' },
    { group: 6, fullName: 'นางสาวแววดาว เตชะธัญญกุล', nickname: 'แววดาว', phone: '093-235-3090', pin: 'L5X4' },
]

export default PARTICIPANTS
