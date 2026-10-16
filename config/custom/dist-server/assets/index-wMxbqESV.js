import { f as api, t as publicApi } from "../entry.server.js";
import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import { i18n } from "@lingui/core";
import { i as QuestionType } from "./types-CqPWB-a5.js";
import { Box, TextInput, Select, Radio, Group, Textarea, Checkbox, NativeSelect } from "@mantine/core";
import { c as countries } from "./countries-C8-MXWCy.js";
import { I as InputGroup } from "./index-CwAoF9NO.js";
import { useRef, useEffect } from "react";
const questionClient = {
  create: async (eventId, question) => {
    const response = await api.post(`events/${eventId}/questions`, question);
    return response.data;
  },
  update: async (eventId, questionId, question) => {
    const response = await api.put(`events/${eventId}/questions/${questionId}`, question);
    return response.data;
  },
  all: async (eventId) => {
    const response = await api.get(`events/${eventId}/questions`);
    return response.data;
  },
  get: async (eventId, questionId) => {
    const response = await api.get(`events/${eventId}/questions/${questionId}`);
    return response.data;
  },
  delete: async (eventId, questionId) => {
    const response = await api.delete(`events/${eventId}/questions/${questionId}`);
    return response.data;
  },
  sortQuestions: async (eventId, questionsSort) => {
    return await api.post(`/events/${eventId}/questions/sort`, questionsSort);
  },
  updateAnswerQuestion: async (eventId, questionId, answerId, answer) => {
    await api.put(`/events/${eventId}/questions/${questionId}/answers/${answerId}`, {
      "answer": answer
    });
  },
  exportAnswers: async (eventId) => {
    const response = await api.post(`events/${eventId}/questions/answers/export`, {});
    return response.data;
  },
  checkExportStatus: async (eventId, jobUuid) => {
    const response = await api.get(`events/${eventId}/questions/answers/export?job_uuid=${jobUuid}`);
    return response.data;
  }
};
const questionClientPublic = {
  all: async (eventId) => {
    const response = await publicApi.get(`events/${eventId}/questions`);
    return response.data;
  }
};
const descriptionWithNoStyle = "_descriptionWithNoStyle_e3y11_1";
const classes = {
  descriptionWithNoStyle
};
const UserGeneratedContent = (props) => {
  const contentRef = useRef(null);
  useEffect(() => {
    if (contentRef.current) {
      const anchors = contentRef.current.querySelectorAll("a");
      anchors.forEach((anchor) => {
        anchor.setAttribute("rel", "nofollow noopener noreferrer ugc");
        anchor.setAttribute("target", "_blank");
      });
    }
  }, [props.children]);
  return /* @__PURE__ */ jsx("div", { ref: contentRef, ...props });
};
const DropDownInput = ({
  question,
  name,
  form
}) => {
  var _a;
  const items = [];
  (_a = question.options) == null ? void 0 : _a.map((option) => {
    items.push({
      value: option,
      label: option
    });
  });
  return /* @__PURE__ */ jsx(Select, { classNames: {
    description: classes.descriptionWithNoStyle
  }, description: /* @__PURE__ */ jsx(UserGeneratedContent, { dangerouslySetInnerHTML: {
    __html: question.description || ""
  } }), ...form.getInputProps(`${name}.answer`), data: items, label: question.title, withAsterisk: question.required });
};
const MultiLineTextInput = ({
  question,
  name,
  form
}) => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(Textarea, { classNames: {
    description: classes.descriptionWithNoStyle
  }, description: /* @__PURE__ */ jsx(UserGeneratedContent, { dangerouslySetInnerHTML: {
    __html: question.description || ""
  } }), ...form.getInputProps(`${name}.answer`), withAsterisk: question.required, label: question.title }) });
};
const DateInput = ({
  question,
  name,
  form
}) => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(TextInput, { withAsterisk: question.required, type: "date", ...form.getInputProps(`${name}.answer`), label: question.title, description: /* @__PURE__ */ jsx(UserGeneratedContent, { dangerouslySetInnerHTML: {
    __html: question.description || ""
  } }) }) });
};
const SingleLineTextInput = ({
  question,
  name,
  form
}) => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(TextInput, { classNames: {
    description: classes.descriptionWithNoStyle
  }, ...form.getInputProps(`${name}.answer`), withAsterisk: question.required, label: question.title, description: /* @__PURE__ */ jsx(UserGeneratedContent, { dangerouslySetInnerHTML: {
    __html: question.description || ""
  } }) }) });
};
const RadioInput = ({
  question,
  name,
  form
}) => {
  var _a;
  return /* @__PURE__ */ jsx(Radio.Group, { classNames: {
    description: classes.descriptionWithNoStyle
  }, withAsterisk: question.required, ...form.getInputProps(`${name}.answer`), label: question.title, description: /* @__PURE__ */ jsx(UserGeneratedContent, { dangerouslySetInnerHTML: {
    __html: question.description || ""
  } }), children: /* @__PURE__ */ jsx(Group, { mt: "xs", children: (_a = question.options) == null ? void 0 : _a.map((option, index) => {
    return /* @__PURE__ */ jsx(Radio, { label: option, value: option }, `${question.id}-radio-${index}`);
  }) }) });
};
const CheckBoxInput = ({
  question,
  name,
  form
}) => {
  var _a;
  return /* @__PURE__ */ jsx(Checkbox.Group, { classNames: {
    description: classes.descriptionWithNoStyle
  }, withAsterisk: question.required, ...form.getInputProps(`${name}.answer`), label: question.title, description: /* @__PURE__ */ jsx(UserGeneratedContent, { dangerouslySetInnerHTML: {
    __html: question.description || ""
  } }), children: /* @__PURE__ */ jsx(Group, { mt: "xs", children: (_a = question.options) == null ? void 0 : _a.map((option, index) => {
    return /* @__PURE__ */ jsx(Checkbox, { label: option, value: option }, `${question.id}-checkbox-${index}`);
  }) }) });
};
const AddressInput = ({
  question,
  name,
  form
}) => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("h4", { children: question.title }),
    /* @__PURE__ */ jsx(UserGeneratedContent, { className: classes.description, dangerouslySetInnerHTML: {
      __html: question.description || ""
    } }),
    /* @__PURE__ */ jsx(TextInput, { withAsterisk: question.required, ...form.getInputProps(`${name}.address_line_1`), label: i18n._(
      /*i18n*/
      {
        id: "NY/x1b"
      }
    ) }),
    /* @__PURE__ */ jsx(TextInput, { mt: 20, ...form.getInputProps(`${name}.address_line_2`), label: i18n._(
      /*i18n*/
      {
        id: "cormHa"
      }
    ) }),
    /* @__PURE__ */ jsxs(InputGroup, { children: [
      /* @__PURE__ */ jsx(TextInput, { withAsterisk: question.required, ...form.getInputProps(`${name}.city`), label: i18n._(
        /*i18n*/
        {
          id: "3wV73y"
        }
      ) }),
      /* @__PURE__ */ jsx(TextInput, { withAsterisk: question.required, ...form.getInputProps(`${name}.state_or_region`), label: i18n._(
        /*i18n*/
        {
          id: "/2by1f"
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxs(InputGroup, { children: [
      /* @__PURE__ */ jsx(TextInput, { withAsterisk: question.required, ...form.getInputProps(`${name}.zip_or_postal_code`), label: i18n._(
        /*i18n*/
        {
          id: "BM/KQm"
        }
      ) }),
      /* @__PURE__ */ jsx(NativeSelect, { withAsterisk: question.required, data: countries, ...form.getInputProps(`${name}.country`), label: i18n._(
        /*i18n*/
        {
          id: "JNCzPW"
        }
      ) })
    ] })
  ] });
};
const QuestionInput = ({
  question,
  name,
  form
}) => {
  let input;
  switch (question.type) {
    case QuestionType.ADDRESS:
      input = /* @__PURE__ */ jsx(AddressInput, { question, name, form });
      break;
    case QuestionType.CHECKBOX:
      input = /* @__PURE__ */ jsx(CheckBoxInput, { question, name, form });
      break;
    case QuestionType.MULTI_LINE_TEXT:
      input = /* @__PURE__ */ jsx(MultiLineTextInput, { question, name, form });
      break;
    case QuestionType.RADIO:
      input = /* @__PURE__ */ jsx(RadioInput, { question, name, form });
      break;
    case QuestionType.DROPDOWN:
      input = /* @__PURE__ */ jsx(DropDownInput, { question, name, form });
      break;
    case QuestionType.SINGLE_LINE_TEXT:
      input = /* @__PURE__ */ jsx(SingleLineTextInput, { question, name, form });
      break;
    case QuestionType.DATE:
      input = /* @__PURE__ */ jsx(DateInput, { question, name, form });
      break;
  }
  return /* @__PURE__ */ jsx(Box, { mt: 20, children: input });
};
const CheckoutOrderQuestions = ({
  questions,
  form
}) => {
  let questionIndex = 0;
  return /* @__PURE__ */ jsx(Fragment, { children: questions.map((question, index) => {
    const name = `order.questions.${questionIndex++}.response`;
    return /* @__PURE__ */ jsx(QuestionInput, { question, name, form }, `${index}-question`);
  }) });
};
const CheckoutProductQuestions = ({
  questions,
  form,
  product,
  index: productIndex
}) => {
  let questionIndex = 0;
  return /* @__PURE__ */ jsx(Fragment, { children: questions.map((question, index) => {
    var _a;
    if (!((_a = question.product_ids) == null ? void 0 : _a.includes(Number(product.id)))) {
      return;
    }
    const name = `products.${productIndex}.questions.${questionIndex++}.response`;
    return /* @__PURE__ */ jsx(QuestionInput, { question, name, form }, `${index}-product`);
  }) });
};
export {
  CheckoutOrderQuestions as C,
  QuestionInput as Q,
  questionClientPublic as a,
  CheckoutProductQuestions as b,
  questionClient as q
};
