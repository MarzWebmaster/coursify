import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useParams } from "react-router";
import { P as PageBody } from "./index-jYxGxbH3.js";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { q as questionClient, Q as QuestionInput } from "./index-wMxbqESV.js";
import { i18n } from "@lingui/core";
import { TextInput, Button, Switch, Group, LoadingOverlay, SegmentedControl, Badge, Text, UnstyledButton, Collapse, Tooltip, Menu, ActionIcon } from "@mantine/core";
import { IconReceipt, IconUser, IconForms, IconAlignBoxLeftTop, IconSquareCheck, IconCircleCheck, IconSelector, IconMapPin, IconCalendar, IconTicket, IconTrash, IconUsers, IconShoppingCart, IconPlus, IconTableExport, IconEye, IconChevronUp, IconChevronDown, IconGripVertical, IconEyeOff, IconDotsVertical, IconPencil } from "@tabler/icons-react";
import { T as Truncate } from "./index-DC4VxyXX.js";
import { useForm } from "@mantine/form";
import { P as PageTitle } from "./index-BD5hc5_Y.js";
import { j as QuestionBelongsToType, i as QuestionType } from "./types-CqPWB-a5.js";
import { notifications } from "@mantine/notifications";
import { u as useGetEvent } from "./useGetEvent-DyvalBPE.js";
import { M as Modal } from "./index-AhXgh6Nz.js";
import { Trans } from "@lingui/react";
import { C as CustomSelect } from "./index-CV5KyLiQ.js";
import { C as Card } from "./index-jHMtuNEo.js";
import { E as Editor } from "./index-D4cOjjnu.js";
import { useState, useEffect } from "react";
import { P as ProductSelector } from "./index-gUnclHYL.js";
import { a as showError, b as showSuccess } from "./notifications-Coh3Ef-t.js";
import { useDisclosure } from "@mantine/hooks";
import { c as confirmationDialog } from "./confirmationDialog-I-HMojnx.js";
import { arrayMove, SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { useSensors, useSensor, PointerSensor, TouchSensor, DndContext, closestCenter } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import classNames from "classnames";
import { a as downloadFile } from "./download-DP3M_6Yt.js";
import { u as useGetEventSettings } from "./useGetEventSettings-DQ44UzoW.js";
import { u as useUpdateEventSettings } from "./useUpdateEventSettings-BRZqoL7m.js";
import { H as HeadingWithDescription } from "./index-encY-Si0.js";
import { T as TableSkeleton } from "./index-C0O2jspF.js";
import "../entry.server.js";
import "react-dom/server";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "process";
import "axios";
import "@mantine/modals";
import "@mantine/dates";
import "@mantine/colors-generator";
import "./countries-C8-MXWCy.js";
import "./index-CwAoF9NO.js";
const GET_EVENT_QUESTIONS_QUERY_KEY = "getEventQuestions";
const useGetEventQuestions = (eventId) => {
  return useQuery({
    queryKey: [GET_EVENT_QUESTIONS_QUERY_KEY, eventId],
    queryFn: async () => {
      const {
        data
      } = await questionClient.all(eventId);
      return data;
    }
  });
};
const container = "_container_1tc9o_1";
const questionsList = "_questionsList_1tc9o_7";
const questionCard = "_questionCard_1tc9o_13";
const hidden = "_hidden_1tc9o_33";
const dragging = "_dragging_1tc9o_40";
const dragHandle = "_dragHandle_1tc9o_46";
const questionContent = "_questionContent_1tc9o_59";
const questionHeader = "_questionHeader_1tc9o_64";
const questionTitle = "_questionTitle_1tc9o_71";
const hiddenIcon = "_hiddenIcon_1tc9o_75";
const questionMeta = "_questionMeta_1tc9o_79";
const emptyState = "_emptyState_1tc9o_84";
const previewCard = "_previewCard_1tc9o_100";
const previewToggle = "_previewToggle_1tc9o_104";
const previewContent = "_previewContent_1tc9o_122";
const previewPane = "_previewPane_1tc9o_139";
const previewDivider = "_previewDivider_1tc9o_161";
const previewQuestions = "_previewQuestions_1tc9o_176";
const defaultFields = "_defaultFields_1tc9o_196";
const defaultFieldsGrid = "_defaultFieldsGrid_1tc9o_207";
const fieldPill = "_fieldPill_1tc9o_213";
const actionsRow = "_actionsRow_1tc9o_227";
const segmentedControl = "_segmentedControl_1tc9o_242";
const classes$1 = {
  container,
  questionsList,
  questionCard,
  hidden,
  dragging,
  dragHandle,
  questionContent,
  questionHeader,
  questionTitle,
  hiddenIcon,
  questionMeta,
  emptyState,
  previewCard,
  previewToggle,
  previewContent,
  previewPane,
  previewDivider,
  previewQuestions,
  defaultFields,
  defaultFieldsGrid,
  fieldPill,
  actionsRow,
  segmentedControl
};
const optionsHeading = "_optionsHeading_19aqn_1";
const noOptionsMessage = "_noOptionsMessage_19aqn_6";
const optionRow = "_optionRow_19aqn_11";
const optionInputWrap = "_optionInputWrap_19aqn_16";
const classes = {
  optionsHeading,
  noOptionsMessage,
  optionRow,
  optionInputWrap
};
const Options = ({
  form
}) => {
  return /* @__PURE__ */ jsxs(Card, { children: [
    /* @__PURE__ */ jsx("h3", { className: classes.optionsHeading, children: /* @__PURE__ */ jsx(Trans, { id: "0zpgxV" }) }),
    form.values.options.length === 0 && /* @__PURE__ */ jsx("div", { className: classes.noOptionsMessage, children: /* @__PURE__ */ jsx(Trans, { id: "blK94r" }) }),
    form.values.options.map((_, index) => {
      const i = index + 1;
      return /* @__PURE__ */ jsxs(Group, { wrap: "nowrap", justify: "space-between", className: classes.optionRow, children: [
        /* @__PURE__ */ jsx("div", { className: classes.optionInputWrap, children: /* @__PURE__ */ jsx(TextInput, { mt: 0, mb: 0, ...form.getInputProps(`options.${index}`), placeholder: i18n._(
          /*i18n*/
          {
            id: "ZZEYpT",
            values: {
              i
            }
          }
        ), required: true, className: classes.optionInput }, index) }),
        /* @__PURE__ */ jsx("div", { className: classes.optionButton, children: /* @__PURE__ */ jsx(Button, { size: "xs", variant: "outline", onClick: () => form.setFieldValue("options", form.values.options.filter((_2, i2) => i2 !== index)), children: /* @__PURE__ */ jsx(IconTrash, { size: 16 }) }) })
      ] });
    }),
    /* @__PURE__ */ jsx(Button, { variant: "outline", onClick: () => form.setFieldValue("options", [...form.values.options, ""]), size: "xs", children: i18n._(
      /*i18n*/
      {
        id: "TZxnm8"
      }
    ) })
  ] });
};
const QuestionForm = ({
  form,
  productCategories
}) => {
  const [showDescription, setShowDescription] = useState(false);
  const belongToOptions = [{
    icon: /* @__PURE__ */ jsx(IconReceipt, {}),
    label: i18n._(
      /*i18n*/
      {
        id: "LBLOqH"
      }
    ),
    value: QuestionBelongsToType.ORDER,
    description: i18n._(
      /*i18n*/
      {
        id: "BHZbFy"
      }
    )
  }, {
    icon: /* @__PURE__ */ jsx(IconUser, {}),
    label: i18n._(
      /*i18n*/
      {
        id: "wu98dY"
      }
    ),
    value: QuestionBelongsToType.PRODUCT,
    description: i18n._(
      /*i18n*/
      {
        id: "Fuh+dI"
      }
    )
  }];
  const questionTypeOptions = [{
    icon: /* @__PURE__ */ jsx(IconForms, {}),
    label: i18n._(
      /*i18n*/
      {
        id: "TNaCfq"
      }
    ),
    value: QuestionType.SINGLE_LINE_TEXT,
    description: i18n._(
      /*i18n*/
      {
        id: "WKMnh4"
      }
    )
  }, {
    icon: /* @__PURE__ */ jsx(IconAlignBoxLeftTop, {}),
    label: i18n._(
      /*i18n*/
      {
        id: "KYveV8"
      }
    ),
    value: QuestionType.MULTI_LINE_TEXT,
    description: i18n._(
      /*i18n*/
      {
        id: "f4vJgj"
      }
    )
  }, {
    icon: /* @__PURE__ */ jsx(IconSquareCheck, {}),
    label: i18n._(
      /*i18n*/
      {
        id: "SpabVf"
      }
    ),
    value: QuestionType.CHECKBOX,
    description: i18n._(
      /*i18n*/
      {
        id: "CNafaC"
      }
    )
  }, {
    icon: /* @__PURE__ */ jsx(IconCircleCheck, {}),
    label: i18n._(
      /*i18n*/
      {
        id: "OMJ035"
      }
    ),
    value: QuestionType.RADIO,
    description: i18n._(
      /*i18n*/
      {
        id: "AG/qmQ"
      }
    )
  }, {
    icon: /* @__PURE__ */ jsx(IconSelector, {}),
    label: i18n._(
      /*i18n*/
      {
        id: "CfKofC"
      }
    ),
    value: QuestionType.DROPDOWN,
    description: i18n._(
      /*i18n*/
      {
        id: "SMUbbQ"
      }
    )
  }, {
    icon: /* @__PURE__ */ jsx(IconMapPin, {}),
    label: i18n._(
      /*i18n*/
      {
        id: "Du6bPw"
      }
    ),
    value: QuestionType.ADDRESS,
    description: i18n._(
      /*i18n*/
      {
        id: "CBBcly"
      }
    )
  }, {
    icon: /* @__PURE__ */ jsx(IconCalendar, {}),
    label: i18n._(
      /*i18n*/
      {
        id: "mYGY3B"
      }
    ),
    value: QuestionType.DATE,
    description: i18n._(
      /*i18n*/
      {
        id: "efAM7X"
      }
    )
  }];
  const multiAnswerQuestionTypes = [QuestionType.CHECKBOX.toString(), QuestionType.RADIO.toString(), QuestionType.DROPDOWN.toString()];
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(CustomSelect, { optionList: belongToOptions, label: i18n._(
      /*i18n*/
      {
        id: "nWhye/"
      }
    ), required: true, form, name: "belongs_to" }),
    form.values.belongs_to === QuestionBelongsToType.PRODUCT && /* @__PURE__ */ jsx(ProductSelector, { label: i18n._(
      /*i18n*/
      {
        id: "gxeWAU"
      }
    ), placeholder: "Select products", icon: /* @__PURE__ */ jsx(IconTicket, { size: "1rem" }), productCategories: productCategories ?? [], form, productFieldName: "product_ids" }),
    /* @__PURE__ */ jsx(CustomSelect, { optionList: questionTypeOptions, label: i18n._(
      /*i18n*/
      {
        id: "5N4wLD"
      }
    ), required: true, form, name: "type" }),
    /* @__PURE__ */ jsx(TextInput, { ...form.getInputProps("title"), label: i18n._(
      /*i18n*/
      {
        id: "oQvMPn"
      }
    ), placeholder: i18n._(
      /*i18n*/
      {
        id: "Rb0XUE"
      }
    ), required: true }),
    showDescription || form.values.description ? /* @__PURE__ */ jsx(Editor, { maxLength: 1e4, editorType: "simple", error: form.errors.description, label: i18n._(
      /*i18n*/
      {
        id: "avf0gk"
      }
    ), description: i18n._(
      /*i18n*/
      {
        id: "4kyDD5"
      }
    ), value: form.values.description, onChange: (value) => form.setFieldValue("description", value) }) : /* @__PURE__ */ jsx(Button, { variant: "transparent", ml: 0, pl: 0, mb: 10, onClick: () => setShowDescription(true), children: i18n._(
      /*i18n*/
      {
        id: "PGPGsL"
      }
    ) }),
    multiAnswerQuestionTypes.includes(form.values.type) && /* @__PURE__ */ jsx(Options, { form }),
    /* @__PURE__ */ jsx(Switch, { mt: 20, ...form.getInputProps("required", {
      type: "checkbox"
    }), description: i18n._(
      /*i18n*/
      {
        id: "1m+YT2"
      }
    ), label: i18n._(
      /*i18n*/
      {
        id: "MU3ijv"
      }
    ) }),
    /* @__PURE__ */ jsx(Switch, { mt: 20, ...form.getInputProps("is_hidden", {
      type: "checkbox"
    }), description: i18n._(
      /*i18n*/
      {
        id: "k3dfFD"
      }
    ), label: i18n._(
      /*i18n*/
      {
        id: "Da29Y6"
      }
    ) })
  ] });
};
const CreateQuestionModal = ({
  onClose,
  onCompleted,
  defaultBelongsTo = "ORDER"
}) => {
  var _a;
  const {
    eventId
  } = useParams();
  const queryClient = useQueryClient();
  const eventQuery = useGetEvent(eventId);
  const productCategories = (_a = eventQuery == null ? void 0 : eventQuery.data) == null ? void 0 : _a.product_categories;
  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      type: QuestionType.SINGLE_LINE_TEXT.toString(),
      required: false,
      options: [],
      product_ids: [],
      apply_to_all_products: true,
      belongs_to: defaultBelongsTo,
      is_hidden: false
    }
  });
  const mutation = useMutation({
    mutationFn: (questionData) => questionClient.create(eventId, questionData),
    onSuccess: ({
      data: question
    }) => {
      notifications.show({
        message: i18n._(
          /*i18n*/
          {
            id: "aIA9C4"
          }
        ),
        color: "green",
        position: "top-center"
      });
      queryClient.invalidateQueries({
        queryKey: [GET_EVENT_QUESTIONS_QUERY_KEY]
      }).then(() => {
        onCompleted(question);
        onClose();
        form.reset();
      });
    },
    onError: (error) => {
      var _a2, _b;
      if ((_b = (_a2 = error == null ? void 0 : error.response) == null ? void 0 : _a2.data) == null ? void 0 : _b.errors) {
        form.setErrors(error.response.data.errors);
      } else {
        showError(i18n._(
          /*i18n*/
          {
            id: "/cSMqv"
          }
        ));
      }
    }
  });
  return /* @__PURE__ */ jsx(Modal, { opened: true, onClose, heading: i18n._(
    /*i18n*/
    {
      id: "B3Mkdt"
    }
  ), children: /* @__PURE__ */ jsxs("form", { onSubmit: form.onSubmit((values) => mutation.mutate(values)), children: [
    /* @__PURE__ */ jsx(QuestionForm, { form, productCategories }),
    /* @__PURE__ */ jsx(Button, { loading: mutation.isPending, type: "submit", fullWidth: true, mt: "xl", "data-testid": "question-submit-button", children: mutation.isPending ? i18n._(
      /*i18n*/
      {
        id: "hqmXmc"
      }
    ) : i18n._(
      /*i18n*/
      {
        id: "B3Mkdt"
      }
    ) })
  ] }) });
};
const GET_QUESTION_QUERY_KEY = "getQuestion";
const useGetQuestion = (eventId, questionId) => {
  return useQuery({
    queryKey: [GET_QUESTION_QUERY_KEY, eventId, questionId],
    queryFn: async () => {
      const {
        data
      } = await questionClient.get(eventId, questionId);
      return data;
    }
  });
};
const EditQuestionModal = ({
  onClose,
  questionId
}) => {
  var _a;
  const {
    eventId
  } = useParams();
  const queryClient = useQueryClient();
  const eventQuery = useGetEvent(eventId);
  const questionQuery = useGetQuestion(eventId, questionId);
  const productsCategories = (_a = eventQuery == null ? void 0 : eventQuery.data) == null ? void 0 : _a.product_categories;
  const form = useForm({
    initialValues: {
      title: "",
      description: "",
      type: QuestionType.SINGLE_LINE_TEXT.toString(),
      required: false,
      options: [],
      product_ids: [],
      belongs_to: "ORDER",
      is_hidden: false
    }
  });
  useEffect(() => {
    var _a2;
    const {
      data
    } = questionQuery;
    if (!data) {
      return;
    }
    form.setValues({
      title: data.title,
      description: data.description,
      type: data.type,
      required: data.required,
      options: data.options,
      product_ids: (_a2 = data.product_ids) == null ? void 0 : _a2.map((id) => String(id)),
      belongs_to: data.belongs_to,
      is_hidden: data.is_hidden
    });
  }, [questionQuery.isFetched]);
  const mutation = useMutation({
    mutationFn: (questionData) => questionClient.update(eventId, questionId, questionData),
    onSuccess: () => {
      notifications.show({
        message: i18n._(
          /*i18n*/
          {
            id: "aIA9C4"
          }
        ),
        color: "green",
        position: "top-center"
      });
      queryClient.invalidateQueries({
        queryKey: [GET_EVENT_QUESTIONS_QUERY_KEY, eventId]
      }).then(() => {
        form.reset();
        onClose();
      }).then(() => {
        queryClient.invalidateQueries({
          queryKey: [GET_QUESTION_QUERY_KEY, eventId, questionId]
        });
      });
    },
    onError: (error) => {
      var _a2, _b;
      if ((_b = (_a2 = error == null ? void 0 : error.response) == null ? void 0 : _a2.data) == null ? void 0 : _b.errors) {
        form.setErrors(error.response.data.errors);
      }
      notifications.show({
        message: i18n._(
          /*i18n*/
          {
            id: "MH/lj8"
          }
        ),
        color: "red",
        position: "top-center"
      });
    }
  });
  return /* @__PURE__ */ jsx(Modal, { opened: true, onClose, heading: i18n._(
    /*i18n*/
    {
      id: "EzwCw7"
    }
  ), children: /* @__PURE__ */ jsxs("form", { onSubmit: form.onSubmit((values) => mutation.mutate(values)), children: [
    /* @__PURE__ */ jsx(QuestionForm, { form, productCategories: productsCategories }),
    !questionQuery.isFetched && /* @__PURE__ */ jsx(LoadingOverlay, { visible: true }),
    /* @__PURE__ */ jsx(Button, { loading: mutation.isPending, type: "submit", fullWidth: true, mt: "xl", children: mutation.isPending ? i18n._(
      /*i18n*/
      {
        id: "hqmXmc"
      }
    ) : i18n._(
      /*i18n*/
      {
        id: "EzwCw7"
      }
    ) })
  ] }) });
};
const useDeleteQuestion = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      eventId,
      questionId
    }) => questionClient.delete(eventId, questionId),
    onSuccess: (_, variables) => queryClient.invalidateQueries({
      queryKey: [GET_EVENT_QUESTIONS_QUERY_KEY, variables.eventId]
    })
  });
};
const useDragItemsHandler = ({
  initialItemIds,
  onSortEnd
}) => {
  const [items, setItems] = useState(initialItemIds);
  const handleDragEnd = (event) => {
    const {
      active,
      over
    } = event;
    if (over && active.id !== over.id) {
      const oldIndex = items.indexOf(active.id);
      const newIndex = items.indexOf(over.id);
      const newArray = arrayMove(items, oldIndex, newIndex);
      setItems(newArray);
      onSortEnd(newArray);
    }
  };
  return {
    items,
    setItems,
    handleDragEnd
  };
};
const useSortQuestions = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      sortedQuestionIds,
      eventId
    }) => questionClient.sortQuestions(eventId, sortedQuestionIds),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [GET_EVENT_QUESTIONS_QUERY_KEY, variables.eventId]
      });
    }
  });
};
const useExportAnswers = (eventId) => {
  const [jobUuid, setJobUuid] = useState(null);
  const startExportMutation = useMutation({
    mutationFn: async () => {
      const {
        job_uuid
      } = await questionClient.exportAnswers(eventId);
      if (!job_uuid) throw new Error(i18n._(
        /*i18n*/
        {
          id: "lKh069"
        }
      ));
      setJobUuid(job_uuid);
      showSuccess(i18n._(
        /*i18n*/
        {
          id: "SVOEsu"
        }
      ));
      return job_uuid;
    }
  });
  const query = useQuery({
    queryKey: ["exportStatus", jobUuid],
    queryFn: async () => {
      if (!jobUuid) {
        return null;
      }
      try {
        const data = await questionClient.checkExportStatus(eventId, jobUuid);
        if (data.status === "FINISHED" && data.download_url) {
          showSuccess(i18n._(
            /*i18n*/
            {
              id: "R4Oqr8"
            }
          ));
          downloadFile(data.download_url, data.download_url.split("/").pop());
          setJobUuid(null);
        }
        if (data.status === "FAILED" || data.status === "NOT_FOUND") {
          showError(i18n._(
            /*i18n*/
            {
              id: "JKfSAv"
            }
          ));
          setJobUuid(null);
        }
        return data;
      } catch (error) {
        showError(i18n._(
          /*i18n*/
          {
            id: "vRznIT"
          }
        ));
        setJobUuid(null);
        return null;
      }
    },
    enabled: !!jobUuid,
    refetchInterval: (data) => {
      var _a, _b;
      const status = (_b = (_a = data == null ? void 0 : data.state) == null ? void 0 : _a.data) == null ? void 0 : _b.status;
      return status === "IN_PROGRESS" ? 5e3 : false;
    }
  });
  return {
    startExport: startExportMutation.mutate,
    isExporting: startExportMutation.isPending || query.isFetching
  };
};
const SortableQuestion = ({
  question,
  onEditModalOpen,
  onDelete
}) => {
  var _a;
  const uniqueId = question.id;
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: uniqueId
  });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };
  const isHidden = question.is_hidden;
  return /* @__PURE__ */ jsxs("div", { style, ref: setNodeRef, className: classNames(classes$1.questionCard, {
    [classes$1.hidden]: isHidden,
    [classes$1.dragging]: isDragging
  }), children: [
    /* @__PURE__ */ jsx("div", { ...attributes, ...listeners, className: classes$1.dragHandle, children: /* @__PURE__ */ jsx(IconGripVertical, { size: 18, stroke: 1.5 }) }),
    /* @__PURE__ */ jsxs("div", { className: classes$1.questionContent, children: [
      /* @__PURE__ */ jsxs("div", { className: classes$1.questionHeader, children: [
        /* @__PURE__ */ jsx(Text, { fw: 500, className: classes$1.questionTitle, children: /* @__PURE__ */ jsx(Truncate, { text: question.title }) }),
        isHidden && /* @__PURE__ */ jsx(Tooltip, { label: i18n._(
          /*i18n*/
          {
            id: "DRErHC"
          }
        ), children: /* @__PURE__ */ jsx(IconEyeOff, { size: 14, className: classes$1.hiddenIcon }) }),
        question.required && /* @__PURE__ */ jsx(Badge, { size: "xs", variant: "light", color: "red", children: i18n._(
          /*i18n*/
          {
            id: "TMLAx2"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs(Text, { size: "xs", c: "dimmed", className: classes$1.questionMeta, children: [
        (_a = question.type) == null ? void 0 : _a.replace("_", " ").toLowerCase(),
        question.options && question.options.length > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
          " · ",
          question.options.length,
          " ",
          i18n._(
            /*i18n*/
            {
              id: "L565X2"
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Menu, { shadow: "md", width: 180, position: "bottom-end", children: [
      /* @__PURE__ */ jsx(Menu.Target, { children: /* @__PURE__ */ jsx(ActionIcon, { variant: "subtle", color: "gray", size: "sm", children: /* @__PURE__ */ jsx(IconDotsVertical, { size: 16 }) }) }),
      /* @__PURE__ */ jsxs(Menu.Dropdown, { children: [
        /* @__PURE__ */ jsx(Menu.Item, { leftSection: /* @__PURE__ */ jsx(IconPencil, { size: 14 }), onClick: () => onEditModalOpen == null ? void 0 : onEditModalOpen(question.id), children: i18n._(
          /*i18n*/
          {
            id: "ePK91l"
          }
        ) }),
        /* @__PURE__ */ jsx(Menu.Divider, {}),
        /* @__PURE__ */ jsx(Menu.Item, { color: "red", leftSection: /* @__PURE__ */ jsx(IconTrash, { size: 14 }), onClick: () => onDelete(question.id), children: i18n._(
          /*i18n*/
          {
            id: "cnGeoo"
          }
        ) })
      ] })
    ] })
  ] });
};
const QuestionsList = ({
  questions,
  onEditModalOpen,
  emptyMessage,
  emptyHint,
  onAddQuestion
}) => {
  const {
    eventId
  } = useParams();
  const deleteQuestionMutation = useDeleteQuestion();
  const sortMutation = useSortQuestions();
  const {
    items,
    setItems,
    handleDragEnd
  } = useDragItemsHandler({
    initialItemIds: questions.map((question) => Number(question.id)),
    onSortEnd: (newArray) => {
      sortMutation.mutate({
        sortedQuestionIds: newArray.map((id, index) => ({
          id,
          order: index + 1
        })),
        eventId
      }, {
        onSuccess: () => showSuccess(i18n._(
          /*i18n*/
          {
            id: "k/bJj0"
          }
        )),
        onError: () => showError(i18n._(
          /*i18n*/
          {
            id: "0+iwE5"
          }
        ))
      });
    }
  });
  useEffect(() => {
    setItems(questions.map((question) => Number(question.id)));
  }, [questions]);
  const sensors = useSensors(useSensor(PointerSensor), useSensor(TouchSensor));
  const onDelete = (id) => {
    confirmationDialog(i18n._(
      /*i18n*/
      {
        id: "mxsm1o"
      }
    ), () => {
      deleteQuestionMutation.mutate({
        eventId,
        questionId: id
      }, {
        onSuccess: () => showSuccess(i18n._(
          /*i18n*/
          {
            id: "XKJuAX"
          }
        )),
        onError: (error) => {
          var _a, _b;
          return showError(((_b = (_a = error == null ? void 0 : error.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) || i18n._(
            /*i18n*/
            {
              id: "vKMKnu"
            }
          ));
        }
      });
    });
  };
  if (questions.length === 0) {
    return /* @__PURE__ */ jsxs("div", { className: classes$1.emptyState, children: [
      /* @__PURE__ */ jsx(Text, { size: "sm", fw: 500, mb: 4, children: emptyMessage }),
      /* @__PURE__ */ jsx(Text, { size: "xs", c: "dimmed", mb: "sm", children: emptyHint }),
      /* @__PURE__ */ jsx(Button, { variant: "light", size: "xs", leftSection: /* @__PURE__ */ jsx(IconPlus, { size: 14 }), onClick: onAddQuestion, "data-testid": "question-add-button-empty", children: i18n._(
        /*i18n*/
        {
          id: "7JF9w9"
        }
      ) })
    ] });
  }
  return /* @__PURE__ */ jsx(DndContext, { sensors, collisionDetection: closestCenter, onDragEnd: handleDragEnd, children: /* @__PURE__ */ jsx(SortableContext, { items, strategy: verticalListSortingStrategy, children: /* @__PURE__ */ jsx("div", { className: classes$1.questionsList, children: questions.map((question) => /* @__PURE__ */ jsx(SortableQuestion, { question, onEditModalOpen, onDelete }, question.id)) }) }) });
};
const DefaultFieldsPreview = () => /* @__PURE__ */ jsx("div", { className: classes$1.defaultFields, children: /* @__PURE__ */ jsxs("div", { className: classes$1.defaultFieldsGrid, children: [
  /* @__PURE__ */ jsx("span", { className: classes$1.fieldPill, children: i18n._(
    /*i18n*/
    {
      id: "kODvZJ"
    }
  ) }),
  /* @__PURE__ */ jsx("span", { className: classes$1.fieldPill, children: i18n._(
    /*i18n*/
    {
      id: "UXBCwc"
    }
  ) }),
  /* @__PURE__ */ jsx("span", { className: classes$1.fieldPill, children: i18n._(
    /*i18n*/
    {
      id: "O3oNi5"
    }
  ) })
] }) });
const LivePreview = ({
  questions,
  isPerOrderCollection
}) => {
  const form = useForm();
  const [isOpen, setIsOpen] = useState(false);
  form.getInputProps = (name) => ({
    id: name,
    value: form.values[name],
    onChange: () => void 0
  });
  const orderQuestions = questions.filter((q) => q.belongs_to === "ORDER" && !q.is_hidden);
  const productQuestions = questions.filter((q) => q.belongs_to === "PRODUCT" && !q.is_hidden);
  return /* @__PURE__ */ jsxs(Card, { className: classes$1.previewCard, children: [
    /* @__PURE__ */ jsxs(UnstyledButton, { className: classes$1.previewToggle, onClick: () => setIsOpen(!isOpen), children: [
      /* @__PURE__ */ jsxs(Group, { gap: "xs", children: [
        /* @__PURE__ */ jsx(IconEye, { size: 16 }),
        /* @__PURE__ */ jsx(Text, { size: "sm", fw: 500, children: i18n._(
          /*i18n*/
          {
            id: "NgVUL2"
          }
        ) })
      ] }),
      isOpen ? /* @__PURE__ */ jsx(IconChevronUp, { size: 16 }) : /* @__PURE__ */ jsx(IconChevronDown, { size: 16 })
    ] }),
    /* @__PURE__ */ jsx(Collapse, { expanded: isOpen, children: /* @__PURE__ */ jsxs("div", { className: classes$1.previewContent, children: [
      /* @__PURE__ */ jsxs("div", { className: classes$1.previewPane, children: [
        /* @__PURE__ */ jsx(Text, { size: "xs", fw: 600, c: "dimmed", tt: "uppercase", mb: 6, children: i18n._(
          /*i18n*/
          {
            id: "UYUgdb"
          }
        ) }),
        /* @__PURE__ */ jsx(DefaultFieldsPreview, {}),
        orderQuestions.length > 0 && /* @__PURE__ */ jsx("div", { className: classes$1.previewQuestions, children: orderQuestions.map((q) => /* @__PURE__ */ jsx(QuestionInput, { question: q, name: String(q.id), form }, q.id)) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: classes$1.previewDivider }),
      /* @__PURE__ */ jsxs("div", { className: classes$1.previewPane, children: [
        /* @__PURE__ */ jsx(Text, { size: "xs", fw: 600, c: "dimmed", tt: "uppercase", mb: 6, children: i18n._(
          /*i18n*/
          {
            id: "dPYu1F"
          }
        ) }),
        !isPerOrderCollection && /* @__PURE__ */ jsx(DefaultFieldsPreview, {}),
        productQuestions.length > 0 ? /* @__PURE__ */ jsx("div", { className: classes$1.previewQuestions, children: productQuestions.map((q) => /* @__PURE__ */ jsx(QuestionInput, { question: q, name: String(q.id), form }, q.id)) }) : isPerOrderCollection ? /* @__PURE__ */ jsx(Text, { size: "xs", c: "dimmed", fs: "italic", children: i18n._(
          /*i18n*/
          {
            id: "fpb0rX"
          }
        ) }) : null
      ] })
    ] }) })
  ] });
};
const QuestionsTable = ({
  questions
}) => {
  var _a;
  const {
    eventId
  } = useParams();
  const [activeTab, setActiveTab] = useState("ORDER");
  const [createModalOpen, {
    open: openCreateModal,
    close: closeCreateModal
  }] = useDisclosure(false);
  const [editModalOpen, {
    open: openEditModal,
    close: closeEditModal
  }] = useDisclosure(false);
  const [questionId, setQuestionId] = useState();
  const eventSettingsQuery = useGetEventSettings(eventId);
  const updateSettingsMutation = useUpdateEventSettings();
  const collectionMethod = ((_a = eventSettingsQuery.data) == null ? void 0 : _a.attendee_details_collection_method) || "PER_TICKET";
  const isPerOrderCollection = collectionMethod === "PER_ORDER";
  const orderQuestions = questions.filter((q) => q.belongs_to === "ORDER");
  const productQuestions = questions.filter((q) => q.belongs_to === "PRODUCT");
  const activeQuestions = activeTab === "ORDER" ? orderQuestions : productQuestions;
  const handleModalOpen = (id) => {
    setQuestionId(id);
    openEditModal();
  };
  const onCompleted = () => {
  };
  const handleCollectionMethodChange = (value) => {
    const val = Array.isArray(value) ? value[0] : value;
    if (!val) return;
    updateSettingsMutation.mutate({
      eventSettings: {
        attendee_details_collection_method: val
      },
      eventId
    }, {
      onSuccess: () => showSuccess(i18n._(
        /*i18n*/
        {
          id: "C3htzi"
        }
      )),
      onError: () => showError(i18n._(
        /*i18n*/
        {
          id: "Eeo/Gy"
        }
      ))
    });
  };
  const collectionMethodOptions = [{
    icon: /* @__PURE__ */ jsx(IconUsers, { size: 20 }),
    label: i18n._(
      /*i18n*/
      {
        id: "96ryID"
      }
    ),
    value: "PER_TICKET",
    description: i18n._(
      /*i18n*/
      {
        id: "tMeVa/"
      }
    )
  }, {
    icon: /* @__PURE__ */ jsx(IconUser, { size: 20 }),
    label: i18n._(
      /*i18n*/
      {
        id: "TkfG8v"
      }
    ),
    value: "PER_ORDER",
    description: i18n._(
      /*i18n*/
      {
        id: "bA31T4"
      }
    )
  }];
  const ExportButton = () => {
    const {
      startExport,
      isExporting
    } = useExportAnswers(eventId);
    return /* @__PURE__ */ jsx(Button, { variant: "subtle", color: "gray", leftSection: /* @__PURE__ */ jsx(IconTableExport, { size: 16 }), loading: isExporting, onClick: () => startExport(), children: i18n._(
      /*i18n*/
      {
        id: "kF8HQ7"
      }
    ) });
  };
  return /* @__PURE__ */ jsxs("div", { className: classes$1.container, children: [
    /* @__PURE__ */ jsx(PageTitle, { subheading: i18n._(
      /*i18n*/
      {
        id: "MXZfGN"
      }
    ), children: i18n._(
      /*i18n*/
      {
        id: "5tl0Bp"
      }
    ) }),
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsx(HeadingWithDescription, { heading: i18n._(
        /*i18n*/
        {
          id: "94aQMU"
        }
      ), description: i18n._(
        /*i18n*/
        {
          id: "raw09+"
        }
      ) }),
      /* @__PURE__ */ jsx(CustomSelect, { optionList: collectionMethodOptions, name: "attendee_details_collection_method", label: i18n._(
        /*i18n*/
        {
          id: "Aspq3b"
        }
      ), value: collectionMethod, onChange: handleCollectionMethodChange, disabled: updateSettingsMutation.isPending })
    ] }),
    /* @__PURE__ */ jsxs(Card, { children: [
      /* @__PURE__ */ jsx(HeadingWithDescription, { heading: i18n._(
        /*i18n*/
        {
          id: "O6mra8"
        }
      ), description: i18n._(
        /*i18n*/
        {
          id: "UWWRyd"
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: classes$1.actionsRow, children: [
        /* @__PURE__ */ jsx(SegmentedControl, { value: activeTab, onChange: (value) => setActiveTab(value), className: classes$1.segmentedControl, data: [{
          value: "ORDER",
          label: /* @__PURE__ */ jsxs(Group, { gap: 6, justify: "center", wrap: "nowrap", children: [
            /* @__PURE__ */ jsx(IconShoppingCart, { size: 16 }),
            /* @__PURE__ */ jsx("span", { className: classes$1.tabLabel, children: i18n._(
              /*i18n*/
              {
                id: "UYUgdb"
              }
            ) }),
            orderQuestions.length > 0 && /* @__PURE__ */ jsx(Badge, { size: "xs", variant: "light", children: orderQuestions.length })
          ] })
        }, {
          value: "PRODUCT",
          label: /* @__PURE__ */ jsxs(Group, { gap: 6, justify: "center", wrap: "nowrap", children: [
            /* @__PURE__ */ jsx(IconUser, { size: 16 }),
            /* @__PURE__ */ jsx("span", { className: classes$1.tabLabel, children: i18n._(
              /*i18n*/
              {
                id: "ss9PbX"
              }
            ) }),
            productQuestions.length > 0 && /* @__PURE__ */ jsx(Badge, { size: "xs", variant: "light", children: productQuestions.length })
          ] })
        }] }),
        /* @__PURE__ */ jsxs(Group, { gap: "xs", wrap: "nowrap", children: [
          /* @__PURE__ */ jsx(ExportButton, {}),
          /* @__PURE__ */ jsx(Button, { leftSection: /* @__PURE__ */ jsx(IconPlus, { size: 16 }), onClick: openCreateModal, "data-testid": "question-add-button", children: i18n._(
            /*i18n*/
            {
              id: "7JF9w9"
            }
          ) })
        ] })
      ] }),
      /* @__PURE__ */ jsx(QuestionsList, { questions: activeQuestions, onEditModalOpen: handleModalOpen, onAddQuestion: openCreateModal, emptyMessage: activeTab === "ORDER" ? i18n._(
        /*i18n*/
        {
          id: "OVFwlg"
        }
      ) : i18n._(
        /*i18n*/
        {
          id: "Dwf4dR"
        }
      ), emptyHint: activeTab === "ORDER" ? i18n._(
        /*i18n*/
        {
          id: "BVinvJ"
        }
      ) : i18n._(
        /*i18n*/
        {
          id: "2hGPQG"
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx(LivePreview, { questions, isPerOrderCollection }),
    createModalOpen && /* @__PURE__ */ jsx(CreateQuestionModal, { onCompleted, onClose: closeCreateModal, defaultBelongsTo: activeTab }),
    editModalOpen && questionId && /* @__PURE__ */ jsx(EditQuestionModal, { questionId, onClose: closeEditModal })
  ] });
};
const Questions = () => {
  const {
    eventId
  } = useParams();
  const questionQuery = useGetEventQuestions(eventId);
  const orderQuestions = questionQuery == null ? void 0 : questionQuery.data;
  return /* @__PURE__ */ jsxs(PageBody, { children: [
    /* @__PURE__ */ jsx(TableSkeleton, { numRows: 5, isVisible: !orderQuestions }),
    orderQuestions && /* @__PURE__ */ jsx(QuestionsTable, { questions: orderQuestions })
  ] });
};
export {
  Questions,
  Questions as default
};
