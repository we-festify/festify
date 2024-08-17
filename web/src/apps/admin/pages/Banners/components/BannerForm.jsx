import Grid, { GridItem } from "../../../../../components/Grid/Grid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Input } from "../../../../../components/AdminCommons/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../../../components/AdminCommons/ui/form";
import { Textarea } from "../../../../../components/AdminCommons/ui/textarea";
import bannerFormSchema from "./bannerFormSchema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../../components/AdminCommons/ui/select";
import { Checkbox } from "../../../../../components/AdminCommons/ui/checkbox";
import { Button } from "../../../../../components/AdminCommons/ui/button";

const BannerForm = ({ onSubmit, defaultValue }) => {
  const form = useForm({
    resolver: zodResolver(bannerFormSchema),
    defaultValues: {
      text: defaultValue?.text || "",
      variant: defaultValue?.variant || "info",
      target: defaultValue?.target || "",
      isActive: defaultValue?.isActive || false,
    },
  });

  const handleSubmit = async (data) => {
    await onSubmit(data, form.reset);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <Grid columns={12}>
          <GridItem sm={12} md={12} lg={12}>
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Text</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="write banner text here..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </GridItem>
          <GridItem sm={12} md={6} lg={4}>
            <FormField
              control={form.control}
              name="variant"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Variant</FormLabel>
                  <FormControl>
                    <Select {...field} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="select variant" />
                      </SelectTrigger>
                      <SelectContent>
                        {["info", "success", "warning", "error"].map(
                          (value) => (
                            <SelectItem key={value} value={value}>
                              {value}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </GridItem>
          <GridItem sm={12} md={6} lg={4}>
            <FormField
              control={form.control}
              name="target"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target</FormLabel>
                  <FormControl>
                    <Input placeholder="/events" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </GridItem>
          <GridItem sm={12} md={6} lg={4}>
            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Is active?</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        {...field}
                        id="isActive"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <FormLabel htmlFor="isActive">Yes</FormLabel>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </GridItem>
          <GridItem sm={12} md={12} lg={12}>
            <Button className="w-full" type="submit">
              Submit
            </Button>
          </GridItem>
        </Grid>
      </form>
    </Form>
  );
};

export default BannerForm;
