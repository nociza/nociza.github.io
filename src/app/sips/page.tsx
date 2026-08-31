import SiplogueIndex from "@/components/siplogue-index";

export default function SipsPage() {
  return <SiplogueIndex referenceNow={new Date().toISOString()} />;
}
