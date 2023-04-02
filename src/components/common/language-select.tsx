import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "@/hooks/useTranslations";

export const LanguageSelect = () => {
  const { changeLanguage, currentLanguage } = useTranslation();

  return (
    <Select
      defaultValue={currentLanguage}
      onValueChange={(value) => {
        changeLanguage(value);
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="sv">Swedish</SelectItem>
          <SelectItem value="fi">Finnish</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
