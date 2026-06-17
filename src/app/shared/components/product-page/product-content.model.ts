import { type IconName } from '../icon/icon.component';

// Content model for a product-detail page (Wood Chips, Wood Pellets, Timber, Afforestation,
// Transportation). Per-page content is code-owned bilingual (selected by LOCALE_ID in the
// page's *-content.data.ts), mirroring the About-section pages. The structural chrome
// (section headings, anchor-nav, the Need-Quotation card) is shared and lives in
// `productChrome(locale)` below so it is not repeated in every page's data file.

export interface ProductBadge {
  readonly icon: IconName;
  readonly label: string;
}

export interface ProductSpec {
  readonly label: string;
  readonly value: string;
}

export interface ProductCard {
  readonly icon: IconName;
  readonly title: string;
  readonly description: string;
}

export interface ProductFaq {
  readonly question: string;
  readonly answer: string;
}

export interface ProductContent {
  /** Product name — the last breadcrumb crumb and the sidebar anchor-nav card title. */
  readonly name: string;
  /** Banner H1. */
  readonly title: string;
  /** Banner intro paragraph. */
  readonly intro: string;
  /** Hero image URL; null → a neutral placeholder block is shown. */
  readonly bannerImage: string | null;
  readonly bannerAlt: string;
  /** Three trust badges shown under the banner intro. */
  readonly badges: readonly ProductBadge[];

  readonly overview: readonly string[];
  readonly overviewImage: string | null;
  readonly overviewImageAlt: string;

  readonly specs: readonly ProductSpec[];

  readonly applicationsIntro: string;
  readonly applications: readonly ProductCard[];

  readonly whyChoose: readonly ProductCard[];

  readonly videoEyebrow: string;
  readonly videoTitle: string;
  readonly videoParagraphs: readonly string[];
  /** Embedded video URL; null → a placeholder thumbnail with a play affordance is shown. */
  readonly videoUrl: string | null;
  readonly videoThumbnail: string | null;

  readonly faqs: readonly ProductFaq[];
}

export interface AnchorNavItem {
  /** In-page section id this item scrolls to. */
  readonly id: string;
  readonly label: string;
}

export interface ProductChrome {
  readonly breadcrumbHome: string;
  readonly breadcrumbProducts: string;
  readonly overviewHeading: string;
  readonly specsHeading: string;
  readonly applicationsHeading: string;
  readonly whyChooseHeading: string;
  readonly videoHeading: string;
  readonly faqHeading: string;
  readonly anchorNav: readonly AnchorNavItem[];
  readonly quotationHeading: string;
  readonly quotationBody: string;
  readonly quotationButton: string;
}

const ANCHORS = [
  'overview',
  'specifications',
  'applications',
  'why-choose-us',
  'video',
  'faqs',
] as const;

const EN: ProductChrome = {
  breadcrumbHome: 'Homepage',
  breadcrumbProducts: 'Products & Services',
  overviewHeading: 'Product Overview',
  specsHeading: 'Specifications',
  applicationsHeading: 'Applications',
  whyChooseHeading: 'Why Choose Us',
  videoHeading: 'Video',
  faqHeading: 'FAQ',
  anchorNav: [
    { id: ANCHORS[0], label: 'Product overview' },
    { id: ANCHORS[1], label: 'Specifications' },
    { id: ANCHORS[2], label: 'Applications' },
    { id: ANCHORS[3], label: 'Why choose us' },
    { id: ANCHORS[4], label: 'Video' },
    { id: ANCHORS[5], label: 'FAQs' },
  ],
  quotationHeading: 'Need Quotation?',
  quotationBody: 'Let us know your requirements, we will get back to you soon.',
  quotationButton: 'Get a quote',
};

const VI: ProductChrome = {
  breadcrumbHome: 'Trang chủ',
  breadcrumbProducts: 'Sản phẩm & Dịch vụ',
  overviewHeading: 'Tổng quan sản phẩm',
  specsHeading: 'Thông số kỹ thuật',
  applicationsHeading: 'Ứng dụng',
  whyChooseHeading: 'Vì sao chọn chúng tôi',
  videoHeading: 'Video',
  faqHeading: 'Câu hỏi thường gặp',
  anchorNav: [
    { id: ANCHORS[0], label: 'Tổng quan sản phẩm' },
    { id: ANCHORS[1], label: 'Thông số kỹ thuật' },
    { id: ANCHORS[2], label: 'Ứng dụng' },
    { id: ANCHORS[3], label: 'Vì sao chọn chúng tôi' },
    { id: ANCHORS[4], label: 'Video' },
    { id: ANCHORS[5], label: 'Câu hỏi thường gặp' },
  ],
  quotationHeading: 'Cần báo giá?',
  quotationBody: 'Hãy cho chúng tôi biết yêu cầu của bạn, chúng tôi sẽ phản hồi sớm.',
  quotationButton: 'Nhận báo giá',
};

export function productChrome(locale: string): ProductChrome {
  return locale.startsWith('vi') ? VI : EN;
}

// Turn any YouTube watch / share / shorts / embed link into a privacy-friendly embed URL so it
// can be dropped straight into an <iframe>. A non-YouTube URL is returned unchanged (assumed
// already embeddable); empty input returns null. To show a video on a product page, just set
// `videoUrl` in its *-content.data.ts to a normal YouTube link — the player appears automatically.
export function videoEmbedUrl(url: string | null): string | null {
  if (!url) {
    return null;
  }

  const match = url.match(
    /(?:youtu\.be\/|youtube(?:-nocookie)?\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|v\/))([A-Za-z0-9_-]{11})/,
  );

  return match ? `https://www.youtube-nocookie.com/embed/${match[1]}` : url;
}
