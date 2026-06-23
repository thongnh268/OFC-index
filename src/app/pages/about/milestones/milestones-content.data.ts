import { type InnerContentBlock } from '../../../shared/components/inner-content/inner-content.component';

// Code-owned bilingual content for the Establishment Milestones page.
// Figma shows no banner here, so `bannerImage` stays null. The shell, sidebar and CTA around it
// are shared by the inner-page layout.

export interface MilestonesContent {
  readonly breadcrumbHome: string;
  readonly breadcrumbAbout: string;
  readonly title: string;
  /** Banner image URL; null → no banner is shown. */
  readonly bannerImage: string | null;
  readonly body: readonly InnerContentBlock[];
}

const EN: MilestonesContent = {
  breadcrumbHome: 'Homepage',
  breadcrumbAbout: 'About us',
  title: 'Establishment Milestones',
  bannerImage: null,
  body: [
    {
      id: 'establishment',
      heading: 'Establishment',
      paragraphs: [
        '<accent>Jan/2019:</accent> Dai Duong Forest Products JSC. was established pursuant to Business Registration Certificate No.2802615442.',
        '<accent>2019:</accent> Dai Duong Wood Chip Factory was built in Nghi Son, Thanh Hoa as a subsidiary of Dai Duong Forest Products JSC.',
        '<accent>Feb/2021:</accent> Dai Duong Forest Products JSC., obtained the FSC Certificates',
        '<b># PBN-COC-070785; PBN-CW-070785</b>',
        '<accent>Mar/2024:</accent> Dai Duong Forest Products JSC., obtained the PEFC Certificates',
        '<b>#VNCE-PEFC-COC-00004</b>',
      ],
    },
    {
      id: 'export-volume',
      heading: 'Quantity of wood chip exported to Japan and China per annum',
      list: [
        '2018: 350.000 BDMT',
        '2019: 450.000 BDMT',
        '2020: 500.000 BDMT',
        '2021: 600.000 BDMT',
        '2022: 800.000 BDMT',
        '2023: 900.000 BDMT',
        '2024: 1.050.000 BDMT',
        '2025: 1.300.000 BDMT (Plan)',
      ],
    },
  ],
};

const VI: MilestonesContent = {
  breadcrumbHome: 'Trang chủ',
  breadcrumbAbout: 'Giới thiệu',
  title: 'Cột mốc thành lập',
  bannerImage: null,
  body: [
    {
      id: 'establishment',
      heading: 'Thành lập',
      paragraphs: [
        '<accent>Tháng 01/2019:</accent> Công ty Cổ phần Lâm sản Đại Dương được thành lập theo Giấy chứng nhận đăng ký doanh nghiệp số 2802615442.',
        '<accent>2019:</accent> Nhà máy Dăm gỗ Đại Dương được xây dựng tại Nghi Sơn, Thanh Hóa, là công ty con của Công ty Cổ phần Lâm sản Đại Dương.',
        '<accent>Tháng 02/2021:</accent> Công ty Cổ phần Lâm sản Đại Dương đạt chứng chỉ FSC',
        '<b># PBN-COC-070785; PBN-CW-070785</b>',
        '<accent>Tháng 03/2024:</accent> Công ty Cổ phần Lâm sản Đại Dương đạt chứng chỉ PEFC',
        '<b>#VNCE-PEFC-COC-00004</b>',
      ],
    },
    {
      id: 'export-volume',
      heading: 'Sản lượng dăm gỗ xuất khẩu sang Nhật Bản và Trung Quốc hằng năm',
      list: [
        '2018: 350.000 BDMT',
        '2019: 450.000 BDMT',
        '2020: 500.000 BDMT',
        '2021: 600.000 BDMT',
        '2022: 800.000 BDMT',
        '2023: 900.000 BDMT',
        '2024: 1.050.000 BDMT',
        '2025: 1.300.000 BDMT (Kế hoạch)',
      ],
    },
  ],
};

export function milestonesContent(locale: string): MilestonesContent {
  return locale.startsWith('vi') ? VI : EN;
}
