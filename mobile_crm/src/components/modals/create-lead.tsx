import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  budgetRangeOptions,
  leadFormSchema,
  type LeadFormData,
} from "./create-lead-schema";
import { Button } from "../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "../../components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { useCreateLead } from "../../services/mutation";
import { toast } from "../../hooks/use-toast";

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LeadForm({ isOpen, onClose }: LeadModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mutate } = useCreateLead({
    options: {
      onError: () => {
        toast({
          title: "Error",
          description: "Something went wrong. Please try again.",
        });
        setIsSubmitting(false);
      },
      onSuccess: () => {
        onClose();
        form.reset();
        setIsSubmitting(false);
        toast({
          title: "Lead created successfully",
          description: "Your lead has been successfully created.",
        });
      },
    },
  });

  const form = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      firstName: "",
      mobileNo: "",
      customerEmail: "",
      budgetRange: undefined,
    },
  });

  async function onSubmit(data: LeadFormData) {
    setIsSubmitting(true);
    try {
      mutate({
        first_name: data.firstName,
        mobile_no: data.mobileNo,
        email_id: data.customerEmail,
        custom_budget_range: data.budgetRange,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogPortal>
        <DialogOverlay className="bg-[#00000056] backdrop-blur-sm" />
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              Create Lead
            </DialogTitle>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                <div className="grid grid-cols-1 gap-6 mb-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex w-full">
                          First Name <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Enter first name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="mobileNo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex w-full">
                          Mobile No <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Enter mobile number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="customerEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex w-full">
                          Customer Email <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Enter email address"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="budgetRange"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex w-full">
                          Budget Range <span className="text-red-500">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select budget range" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {budgetRangeOptions.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </form>
            </Form>
          </DialogHeader>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
