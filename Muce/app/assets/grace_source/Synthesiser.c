#include <gracelib.h>
#include <stdlib.h>
#ifndef __CYGWIN__
#pragma weak main
#endif
static char compilerRevision[] = "e33f3452d00ddf38a32b640a4945c512ba51b206";
static Object undefined;
extern Object done;
extern Object _prelude;
extern Object String;
extern Object Number;
extern Object Boolean;
extern Object Dynamic;
extern Object Unknown;
extern Object List;
extern Object Block;
extern Object Done;
extern Object Type;
extern Object GraceDefaultObject;
extern Object sourceObject;
static Object type_String;
static Object type_Number;
static Object type_Boolean;
static Object type_Block;
static Object type_Done;
static Object argv;
static Object emptyclosure;
static Object prelude;
static int isTailObject = 0;
static Object inheritingObject = NULL;
static const char modulename[] = "Synthesiser";
Object module_StandardPrelude_init();
Object module_imports_init();
static char *originalSourceLines[] = {
  "import \"Instrument\" as Instrument",
  "import \"Oscillator\" as Oscillator",
  "",
  "class Synth.name(name) mono(polyphony) waveform(waveform') {",
  "  var mono := polyphony",
  "  var waveform := waveform'",
  "  var oscillators := initialiseOscillators()",
  "",
  "  method initialiseOscillators {",
  "    if (mono) then {",
  "      print (\"mono\")",
  "      return \"sauce\"",
  "    }",
  "    else {",
  "      print (\"poly\")",
  "      return \"suace\"",
  "    }",
  "  }",
  "}",
  "",
  "var s := Synth.name(\"Synth1\") mono(true) waveform(\"sine\")",
  NULL
};
Object reader_Synthesiser_outer_2(Object self, int nparams, int *argcv, Object* args, int flags) {
  struct UserObject *uo = (struct UserObject*)self;
  return uo->data[0];
}
Object reader_Synthesiser_outer_5(Object self, int nparams, int *argcv, Object* args, int flags) {
  struct UserObject *uo = (struct UserObject*)self;
  return uo->data[0];
}
Object reader_Synthesiser_mono_6(Object self, int nparams, int *argcv, Object* args, int flags) {
  struct UserObject *uo = (struct UserObject *)self;
  return uo->data[1];
}
Object writer_Synthesiser_mono_6(Object self, int nparams, int *argcv, Object* args, int flags) {
  struct UserObject *uo = (struct UserObject *)self;
  uo->data[1] = args[0];
  return done;
}
Object reader_Synthesiser_waveform_7(Object self, int nparams, int *argcv, Object* args, int flags) {
  struct UserObject *uo = (struct UserObject *)self;
  return uo->data[2];
}
Object writer_Synthesiser_waveform_7(Object self, int nparams, int *argcv, Object* args, int flags) {
  struct UserObject *uo = (struct UserObject *)self;
  uo->data[2] = args[0];
  return done;
}
Object reader_Synthesiser_oscillators_8(Object self, int nparams, int *argcv, Object* args, int flags) {
  struct UserObject *uo = (struct UserObject *)self;
  return uo->data[3];
}
Object writer_Synthesiser_oscillators_8(Object self, int nparams, int *argcv, Object* args, int flags) {
  struct UserObject *uo = (struct UserObject *)self;
  uo->data[3] = args[0];
  return done;
}
Object module_Instrument;
Object module_Instrument_init();
Object module_Oscillator;
Object module_Oscillator_init();
static ClassData objclass1;
static ClassData objclass4;
static Object strlit13;
static Object strlit15;
static Object strlit16;
static Object strlit18;
static Object strlit23;
static Object strlit25;
Object meth_Synthesiser_Synth0(Object self, int nparts, int *argcv, Object *args, int32_t flags) {
  struct UserObject *uo = (struct UserObject*)self;
  Object closure = getdatum((Object)uo, 1, (flags>>24)&0xff);
  struct StackFrameObject *stackframe = alloc_StackFrame(1, getclosureframe(closure));
  pushclosure(closure);
  pushstackframe(stackframe, "Synth");
  int frame = gc_frame_new();
  gc_frame_newslot((Object)stackframe);
  Object methodInheritingObject = NULL;
  Object params[1];
  int partcv[1];
  Object *var_Synth = getfromclosure(closure, 0);
  int i;
  int curarg = 0;
  int pushcv[] = {1};
  if (nparts < 1 && args)
    gracedie("missing argument list for Synth (probably reflection error): got %i lists, expected 1.", nparts);
if (argcv && argcv[0] > 0)
  gracedie("too many arguments for Synth");
  Object *selfslot = &(stackframe->slots[0]);
  *selfslot = self;
  setframeelementname(stackframe, 0, "self");
  if (methodInheritingObject) curarg++;
// Begin line 4
  setline(4);
  setmodule(modulename);
  setsource(originalSourceLines);
// compilenode returning *var_Synth
  gc_frame_end(frame);
  return *var_Synth;
}
Object meth_Synthesiser_initialiseOscillators9(Object self, int nparts, int *argcv, Object *args, int32_t flags) {
  struct StackFrameObject *stackframe = alloc_StackFrame(1, NULL);
  pushclosure(NULL);
  pushstackframe(stackframe, "initialiseOscillators");
  int frame = gc_frame_new();
  gc_frame_newslot((Object)stackframe);
  Object methodInheritingObject = NULL;
  Object params[1];
  int partcv[1];
  int i;
  int curarg = 0;
  int pushcv[] = {1};
  if (nparts < 1 && args)
    gracedie("missing argument list for initialiseOscillators (probably reflection error): got %i lists, expected 1.", nparts);
if (argcv && argcv[0] > 0)
  gracedie("too many arguments for initialiseOscillators");
  Object *selfslot = &(stackframe->slots[0]);
  *selfslot = self;
  setframeelementname(stackframe, 0, "self");
  if (methodInheritingObject) curarg++;
// Begin line 18
  setline(18);
  setmodule(modulename);
  setsource(originalSourceLines);
// Begin line 10
  setline(10);
  setmodule(modulename);
  setsource(originalSourceLines);
  int callframe11 = gc_frame_new();
  partcv[0] = 0;
  Object call12 = callmethodflags(self, "mono", 1, partcv, params, CFLAG_SELF);
  gc_frame_end(callframe11);
// compilenode returning call12
  Object if10 = done;
  if (istrue(call12)) {
// Begin line 11
  setline(11);
  setmodule(modulename);
  setsource(originalSourceLines);
  if (strlit13 == NULL) {
    strlit13 = alloc_String("mono");
    gc_root(strlit13);
  }
// compilenode returning strlit13
  params[0] = strlit13;
  Object call14 = gracelib_print(NULL, 1,  params);
// compilenode returning call14
// Begin line 13
  setline(13);
  setmodule(modulename);
  setsource(originalSourceLines);
// Begin line 12
  setline(12);
  setmodule(modulename);
  setsource(originalSourceLines);
  if (strlit15 == NULL) {
    strlit15 = alloc_String("sauce");
    gc_root(strlit15);
  }
// compilenode returning strlit15
  return strlit15;
// compilenode returning undefined
    gc_frame_newslot(undefined);
    if10 = undefined;
  } else {
// Begin line 15
  setline(15);
  setmodule(modulename);
  setsource(originalSourceLines);
  if (strlit16 == NULL) {
    strlit16 = alloc_String("poly");
    gc_root(strlit16);
  }
// compilenode returning strlit16
  params[0] = strlit16;
  Object call17 = gracelib_print(NULL, 1,  params);
// compilenode returning call17
// Begin line 17
  setline(17);
  setmodule(modulename);
  setsource(originalSourceLines);
// Begin line 16
  setline(16);
  setmodule(modulename);
  setsource(originalSourceLines);
  if (strlit18 == NULL) {
    strlit18 = alloc_String("suace");
    gc_root(strlit18);
  }
// compilenode returning strlit18
  return strlit18;
// compilenode returning undefined
    gc_frame_newslot(undefined);
    if10 = undefined;
  }
// compilenode returning if10
  gc_frame_end(frame);
  return if10;
}
Object meth_Synthesiser_name_40__41_mono_40__41_waveform3(Object self, int nparts, int *argcv, Object *args, int32_t flags) {
  struct StackFrameObject *stackframe = alloc_StackFrame(4, NULL);
  pushclosure(NULL);
  pushstackframe(stackframe, "name()mono()waveform");
  int frame = gc_frame_new();
  gc_frame_newslot((Object)stackframe);
  Object methodInheritingObject = NULL;
  if (nparts > 0 && argcv[0] < 1)
    gracedie("insufficient arguments to method");
  if (nparts > 0 && argcv[1] < 1)
    gracedie("insufficient arguments to method");
  if (nparts > 0 && argcv[2] < 1)
    gracedie("insufficient arguments to method");
  Object params[1];
  int partcv[1];
  int i;
  int curarg = 0;
  int pushcv[] = {1};
  if (nparts < 3 && args)
    gracedie("missing argument list for name()mono()waveform (probably reflection error): got %i lists, expected 3.", nparts);
  Object *var_name = &(stackframe->slots[0]);
  *var_name = args[curarg];
  curarg++;
if (argcv && argcv[0] > 1)
  gracedie("too many arguments for name");
  Object *var_polyphony = &(stackframe->slots[1]);
  *var_polyphony = args[curarg];
  curarg++;
if (argcv && argcv[1] > 1)
  gracedie("too many arguments for mono");
  Object *var_waveform_39_ = &(stackframe->slots[2]);
  *var_waveform_39_ = args[curarg];
  curarg++;
if (argcv && argcv[2] > 1)
  gracedie("too many arguments for waveform");
  Object *selfslot = &(stackframe->slots[3]);
  *selfslot = self;
  setframeelementname(stackframe, 0, "self");
  if (methodInheritingObject) curarg++;
  isTailObject = 1;
  inheritingObject = methodInheritingObject;
  Object inheritingObject4 = inheritingObject;
  if (isTailObject) {
    isTailObject = 0;
    inheritingObject = NULL;
  }
  Object obj4 = alloc_userobj3(7, 5, 0, objclass4);
  gc_frame_newslot(obj4);
if (objclass4 == NULL) {
  glfree(obj4->class->name);
  obj4->class->name = "Synth";
}
// OBJECT OUTER DEC outer
  adddatum2(obj4, self, 0);
  addmethodreal(obj4,"outer", &reader_Synthesiser_outer_5);
  Object oldself4 = self;
  struct StackFrameObject *oldstackframe4 = stackframe;
  stackframe = alloc_StackFrame(1, oldstackframe4);
  gc_frame_newslot((Object)stackframe);
  self = obj4;
  Object *oldselfslot4 = selfslot;
  selfslot = &stackframe->slots[0];
  *selfslot = self;
  setframeelementname(stackframe, 0, "self");
  Object thisouter4 = (*(struct UserObject *)self).data[0], lowerouter4 = thisouter4;
  if (inheritingObject4) {
    struct UserObject *inho4 = (struct UserObject *)inheritingObject4;
    while (inho4->super != GraceDefaultObject) inho4 = (struct UserObject *)inho4->super;
    inho4->super = obj4;
    self = inheritingObject4;
    *selfslot = self;
    lowerouter4 = (*(struct UserObject *)self).data[0];
    (*(struct UserObject *)self).data[0] = thisouter4;
  }
if (objclass4 == NULL) {
  Method *reader6 = addmethodrealflags(obj4, "mono",&reader_Synthesiser_mono_6, MFLAG_CONFIDENTIAL);
  Method *writer6 = addmethodrealflags(obj4, "mono:=",&writer_Synthesiser_mono_6, MFLAG_CONFIDENTIAL);
  reader6->definitionModule = modulename;
  writer6->definitionModule = modulename;
  reader6->definitionLine = 6;
  writer6->definitionLine = 6;
}
obj4->flags |= OFLAG_MUTABLE;
adddatum2(obj4, alloc_Undefined(), 1);
if (objclass4 == NULL) {
  Method *reader7 = addmethodrealflags(obj4, "waveform",&reader_Synthesiser_waveform_7, MFLAG_CONFIDENTIAL);
  Method *writer7 = addmethodrealflags(obj4, "waveform:=",&writer_Synthesiser_waveform_7, MFLAG_CONFIDENTIAL);
  reader7->definitionModule = modulename;
  writer7->definitionModule = modulename;
  reader7->definitionLine = 7;
  writer7->definitionLine = 7;
}
obj4->flags |= OFLAG_MUTABLE;
adddatum2(obj4, alloc_Undefined(), 2);
if (objclass4 == NULL) {
  Method *reader8 = addmethodrealflags(obj4, "oscillators",&reader_Synthesiser_oscillators_8, MFLAG_CONFIDENTIAL);
  Method *writer8 = addmethodrealflags(obj4, "oscillators:=",&writer_Synthesiser_oscillators_8, MFLAG_CONFIDENTIAL);
  reader8->definitionModule = modulename;
  writer8->definitionModule = modulename;
  reader8->definitionLine = 7;
  writer8->definitionLine = 7;
}
obj4->flags |= OFLAG_MUTABLE;
adddatum2(obj4, alloc_Undefined(), 3);
  struct UserObject *uo9 = (struct UserObject*)obj4;
  uo9->data[4] = emptyclosure;
  Method *meth_meth_Synthesiser_initialiseOscillators9 = addmethod2pos(obj4, "initialiseOscillators", &meth_Synthesiser_initialiseOscillators9, 4);
int argcv_meth_Synthesiser_initialiseOscillators9[] = {0};
meth_meth_Synthesiser_initialiseOscillators9->type = alloc_MethodType(1, argcv_meth_Synthesiser_initialiseOscillators9);
  meth_meth_Synthesiser_initialiseOscillators9->definitionModule = modulename;
  meth_meth_Synthesiser_initialiseOscillators9->definitionLine = 9;
  sourceObject = obj4;
// Begin line 5
  setline(5);
  setmodule(modulename);
  setsource(originalSourceLines);
// compilenode returning *var_polyphony
  adddatum2(obj4, *var_polyphony, 1);
  sourceObject = obj4;
// Begin line 6
  setline(6);
  setmodule(modulename);
  setsource(originalSourceLines);
// compilenode returning *var_waveform_39_
  adddatum2(obj4, *var_waveform_39_, 2);
  sourceObject = obj4;
// Begin line 7
  setline(7);
  setmodule(modulename);
  setsource(originalSourceLines);
  int callframe19 = gc_frame_new();
  partcv[0] = 0;
  Object call20 = callmethodflags(self, "initialiseOscillators", 1, partcv, params, CFLAG_SELF);
  gc_frame_end(callframe19);
// compilenode returning call20
  adddatum2(obj4, call20, 3);
  sourceObject = obj4;
objclass4 = obj4->class;
  objclass4->definitionModule = modulename;
  objclass4->definitionLine = 21;
  (*(struct UserObject *)self).data[0] = lowerouter4;
  self = oldself4;
  selfslot = oldselfslot4;
  stackframe = oldstackframe4;
  gc_frame_end(frame);
  return obj4;
}
Object meth_Synthesiser_name_40__41_mono_40__41_waveform3_object(Object self, int nparts, int *argcv, Object *args, int32_t flags) {
  struct StackFrameObject *stackframe = alloc_StackFrame(4, NULL);
  pushclosure(NULL);
  pushstackframe(stackframe, "name()mono()waveform()object");
  int frame = gc_frame_new();
  gc_frame_newslot((Object)stackframe);
  Object methodInheritingObject = args[0 + argcv[0] + argcv[1] + argcv[2]];
  if (nparts > 0 && argcv[0] < 1)
    gracedie("insufficient arguments to method");
  if (nparts > 0 && argcv[1] < 1)
    gracedie("insufficient arguments to method");
  if (nparts > 0 && argcv[2] < 1)
    gracedie("insufficient arguments to method");
  Object params[1];
  int partcv[1];
  int i;
  int curarg = 0;
  int pushcv[] = {1};
  if (nparts < 3 && args)
    gracedie("missing argument list for name()mono()waveform (probably reflection error): got %i lists, expected 3.", nparts);
  Object *var_name = &(stackframe->slots[0]);
  *var_name = args[curarg];
  curarg++;
if (argcv && argcv[0] > 1)
  gracedie("too many arguments for name");
  Object *var_polyphony = &(stackframe->slots[1]);
  *var_polyphony = args[curarg];
  curarg++;
if (argcv && argcv[1] > 1)
  gracedie("too many arguments for mono");
  Object *var_waveform_39_ = &(stackframe->slots[2]);
  *var_waveform_39_ = args[curarg];
  curarg++;
if (argcv && argcv[2] > 1)
  gracedie("too many arguments for waveform");
  Object *selfslot = &(stackframe->slots[3]);
  *selfslot = self;
  setframeelementname(stackframe, 0, "self");
  if (methodInheritingObject) curarg++;
  isTailObject = 1;
  inheritingObject = methodInheritingObject;
  Object inheritingObject4 = inheritingObject;
  if (isTailObject) {
    isTailObject = 0;
    inheritingObject = NULL;
  }
  Object obj4 = alloc_userobj3(7, 5, 0, objclass4);
  gc_frame_newslot(obj4);
if (objclass4 == NULL) {
  glfree(obj4->class->name);
  obj4->class->name = "Synth";
}
// OBJECT OUTER DEC outer
  adddatum2(obj4, self, 0);
  addmethodreal(obj4,"outer", &reader_Synthesiser_outer_5);
  Object oldself4 = self;
  struct StackFrameObject *oldstackframe4 = stackframe;
  stackframe = alloc_StackFrame(1, oldstackframe4);
  gc_frame_newslot((Object)stackframe);
  self = obj4;
  Object *oldselfslot4 = selfslot;
  selfslot = &stackframe->slots[0];
  *selfslot = self;
  setframeelementname(stackframe, 0, "self");
  Object thisouter4 = (*(struct UserObject *)self).data[0], lowerouter4 = thisouter4;
  if (inheritingObject4) {
    struct UserObject *inho4 = (struct UserObject *)inheritingObject4;
    while (inho4->super != GraceDefaultObject) inho4 = (struct UserObject *)inho4->super;
    inho4->super = obj4;
    self = inheritingObject4;
    *selfslot = self;
    lowerouter4 = (*(struct UserObject *)self).data[0];
    (*(struct UserObject *)self).data[0] = thisouter4;
  }
if (objclass4 == NULL) {
  Method *reader6 = addmethodrealflags(obj4, "mono",&reader_Synthesiser_mono_6, MFLAG_CONFIDENTIAL);
  Method *writer6 = addmethodrealflags(obj4, "mono:=",&writer_Synthesiser_mono_6, MFLAG_CONFIDENTIAL);
  reader6->definitionModule = modulename;
  writer6->definitionModule = modulename;
  reader6->definitionLine = 6;
  writer6->definitionLine = 6;
}
obj4->flags |= OFLAG_MUTABLE;
adddatum2(obj4, alloc_Undefined(), 1);
if (objclass4 == NULL) {
  Method *reader7 = addmethodrealflags(obj4, "waveform",&reader_Synthesiser_waveform_7, MFLAG_CONFIDENTIAL);
  Method *writer7 = addmethodrealflags(obj4, "waveform:=",&writer_Synthesiser_waveform_7, MFLAG_CONFIDENTIAL);
  reader7->definitionModule = modulename;
  writer7->definitionModule = modulename;
  reader7->definitionLine = 7;
  writer7->definitionLine = 7;
}
obj4->flags |= OFLAG_MUTABLE;
adddatum2(obj4, alloc_Undefined(), 2);
if (objclass4 == NULL) {
  Method *reader8 = addmethodrealflags(obj4, "oscillators",&reader_Synthesiser_oscillators_8, MFLAG_CONFIDENTIAL);
  Method *writer8 = addmethodrealflags(obj4, "oscillators:=",&writer_Synthesiser_oscillators_8, MFLAG_CONFIDENTIAL);
  reader8->definitionModule = modulename;
  writer8->definitionModule = modulename;
  reader8->definitionLine = 7;
  writer8->definitionLine = 7;
}
obj4->flags |= OFLAG_MUTABLE;
adddatum2(obj4, alloc_Undefined(), 3);
  struct UserObject *uo9 = (struct UserObject*)obj4;
  uo9->data[4] = emptyclosure;
  Method *meth_meth_Synthesiser_initialiseOscillators9 = addmethod2pos(obj4, "initialiseOscillators", &meth_Synthesiser_initialiseOscillators9, 4);
int argcv_meth_Synthesiser_initialiseOscillators9[] = {0};
meth_meth_Synthesiser_initialiseOscillators9->type = alloc_MethodType(1, argcv_meth_Synthesiser_initialiseOscillators9);
  meth_meth_Synthesiser_initialiseOscillators9->definitionModule = modulename;
  meth_meth_Synthesiser_initialiseOscillators9->definitionLine = 9;
  sourceObject = obj4;
// Begin line 5
  setline(5);
  setmodule(modulename);
  setsource(originalSourceLines);
// compilenode returning *var_polyphony
  adddatum2(obj4, *var_polyphony, 1);
  sourceObject = obj4;
// Begin line 6
  setline(6);
  setmodule(modulename);
  setsource(originalSourceLines);
// compilenode returning *var_waveform_39_
  adddatum2(obj4, *var_waveform_39_, 2);
  sourceObject = obj4;
// Begin line 7
  setline(7);
  setmodule(modulename);
  setsource(originalSourceLines);
  int callframe19 = gc_frame_new();
  partcv[0] = 0;
  Object call20 = callmethodflags(self, "initialiseOscillators", 1, partcv, params, CFLAG_SELF);
  gc_frame_end(callframe19);
// compilenode returning call20
  adddatum2(obj4, call20, 3);
  sourceObject = obj4;
objclass4 = obj4->class;
  objclass4->definitionModule = modulename;
  objclass4->definitionLine = 21;
  (*(struct UserObject *)self).data[0] = lowerouter4;
  self = oldself4;
  selfslot = oldselfslot4;
  stackframe = oldstackframe4;
  gc_frame_end(frame);
  return obj4;
}
Object meth_Synthesiser_s27(Object self, int nparts, int *argcv, Object *args, int32_t flags) {
  struct UserObject *uo = (struct UserObject*)self;
  Object closure = getdatum((Object)uo, 2, (flags>>24)&0xff);
  struct StackFrameObject *stackframe = alloc_StackFrame(1, getclosureframe(closure));
  pushclosure(closure);
  pushstackframe(stackframe, "s");
  int frame = gc_frame_new();
  gc_frame_newslot((Object)stackframe);
  Object methodInheritingObject = NULL;
  Object params[1];
  int partcv[1];
  Object *var_s = getfromclosure(closure, 0);
  int i;
  int curarg = 0;
  int pushcv[] = {1};
  if (nparts < 1 && args)
    gracedie("missing argument list for s (probably reflection error): got %i lists, expected 1.", nparts);
if (argcv && argcv[0] > 0)
  gracedie("too many arguments for <Identifier[s]>");
  Object *selfslot = &(stackframe->slots[0]);
  *selfslot = self;
  setframeelementname(stackframe, 0, "self");
  if (methodInheritingObject) curarg++;
// compilenode returning *var_s
  gc_frame_end(frame);
  return *var_s;
}
Object meth_Synthesiser_s_58__61_28(Object self, int nparts, int *argcv, Object *args, int32_t flags) {
  struct UserObject *uo = (struct UserObject*)self;
  Object closure = getdatum((Object)uo, 3, (flags>>24)&0xff);
  struct StackFrameObject *stackframe = alloc_StackFrame(2, getclosureframe(closure));
  pushclosure(closure);
  pushstackframe(stackframe, "s:=");
  int frame = gc_frame_new();
  gc_frame_newslot((Object)stackframe);
  Object methodInheritingObject = NULL;
  if (nparts > 0 && argcv[0] < 1)
    gracedie("insufficient arguments to method");
  Object params[1];
  int partcv[1];
  Object *var_s = getfromclosure(closure, 0);
  int i;
  int curarg = 0;
  int pushcv[] = {1};
  if (nparts < 1 && args)
    gracedie("missing argument list for s:= (probably reflection error): got %i lists, expected 1.", nparts);
  Object *var__var_assign_tmp = &(stackframe->slots[0]);
  *var__var_assign_tmp = args[curarg];
  curarg++;
if (argcv && argcv[0] > 1)
  gracedie("too many arguments for <Identifier[s:=]>");
  Object *selfslot = &(stackframe->slots[1]);
  *selfslot = self;
  setframeelementname(stackframe, 0, "self");
  if (methodInheritingObject) curarg++;
// compilenode returning *var__var_assign_tmp
  *var_s = *var__var_assign_tmp;
  if (*var__var_assign_tmp == undefined)
    callmethod(done, "assignment", 0, NULL, NULL);
// compilenode returning done
  gc_frame_end(frame);
  return done;
}
Object module_Synthesiser_init() {
  int flags = 0;
  int frame = gc_frame_new();
  Object self = alloc_obj2(5, 5);
  self->class->definitionModule = modulename;
  gc_root(self);
  prelude = module_StandardPrelude_init();
  adddatum2(self, prelude, 0);
  addmethod2(self, "outer", &grace_userobj_outer);
  setline(1);
  setmodule(modulename);
  setsource(originalSourceLines);
  setclassname(self, "Module<Synthesiser>");
  Object *var_MatchFailed = alloc_var();
  *var_MatchFailed = alloc_MatchFailed();
  Object *var_noSuchValue = alloc_var();
  *var_noSuchValue = done;
  Object *var_done = alloc_var();
  *var_done = done;
  Object *var_String = alloc_var();
  *var_String = String;
  type_String = String;
  Object *var_Block = alloc_var();
  *var_Block = Block;
  type_Block = Block;
  Object *var_Done = alloc_var();
  *var_Done = Done;
  type_Done = Done;
  Object *var_Number = alloc_var();
  *var_Number = Number;
  type_Number = Number;
  Object *var_Boolean = alloc_var();
  *var_Boolean = Boolean;
  type_Boolean = Boolean;
  Object *var_Dynamic = alloc_var();
  *var_Dynamic = Dynamic;
  Object *var_Unknown = alloc_var();
  *var_Unknown= Unknown;
  Object *var_List = alloc_var();
  *var_List = List;
  Object *var_Type = alloc_var();
  *var_Type = Type;
  Object *var__prelude = alloc_var();
  *var__prelude = grace_prelude();
  gc_root(*var_MatchFailed);
  emptyclosure = createclosure(0, "empty");
  gc_root(emptyclosure);
  struct StackFrameObject *stackframe = alloc_StackFrame(5, NULL);
  gc_root((Object)stackframe);
  pushstackframe(stackframe, "module scope");
  Object *selfslot = &(stackframe->slots[0]);
  *selfslot = self;
  setframeelementname(stackframe, 0, "self");
  Object params[3];
  int partcv[3];
Object *var_Instrument = alloc_var();
Object *var_Oscillator = alloc_var();
  Object *var_Synth = &(stackframe->slots[1]);
  setframeelementname(stackframe, 1, "Synth");
  Object *var_s = &(stackframe->slots[2]);
  setframeelementname(stackframe, 2, "s");
// Import of Instrument as Instrument
  if (module_Instrument == NULL)
    module_Instrument = module_Instrument_init();
  *var_Instrument = module_Instrument;
// compilenode returning done
// Begin line 2
  setline(2);
  setmodule(modulename);
  setsource(originalSourceLines);
// Import of Oscillator as Oscillator
  if (module_Oscillator == NULL)
    module_Oscillator = module_Oscillator_init();
  *var_Oscillator = module_Oscillator;
// compilenode returning done
// compilenode returning 
// Begin line 4
  setline(4);
  setmodule(modulename);
  setsource(originalSourceLines);
// Begin line 21
  setline(21);
  setmodule(modulename);
  setsource(originalSourceLines);
  block_savedest(self);
  Object closure0 = createclosure(1, "Synth");
setclosureframe(closure0, stackframe);
  addtoclosure(closure0, var_Synth);
  struct UserObject *uo0 = (struct UserObject*)self;
  uo0->data[1] = (Object)closure0;
  Method *meth_meth_Synthesiser_Synth0 = addmethod2pos(self, "Synth", &meth_Synthesiser_Synth0, 1);
int argcv_meth_Synthesiser_Synth0[] = {0};
meth_meth_Synthesiser_Synth0->type = alloc_MethodType(1, argcv_meth_Synthesiser_Synth0);
  meth_meth_Synthesiser_Synth0->definitionModule = modulename;
  meth_meth_Synthesiser_Synth0->definitionLine = 21;
// compilenode returning 
// Begin line 21
  setline(21);
  setmodule(modulename);
  setsource(originalSourceLines);
  Object inheritingObject1 = inheritingObject;
  if (isTailObject) {
    isTailObject = 0;
    inheritingObject = NULL;
  }
  Object obj1 = alloc_userobj3(2, 4, 0, objclass1);
  gc_frame_newslot(obj1);
// OBJECT OUTER DEC outer
  adddatum2(obj1, self, 0);
  addmethodreal(obj1,"outer", &reader_Synthesiser_outer_2);
  Object oldself1 = self;
  struct StackFrameObject *oldstackframe1 = stackframe;
  stackframe = alloc_StackFrame(1, oldstackframe1);
  gc_frame_newslot((Object)stackframe);
  self = obj1;
  Object *oldselfslot1 = selfslot;
  selfslot = &stackframe->slots[0];
  *selfslot = self;
  setframeelementname(stackframe, 0, "self");
  Object thisouter1 = (*(struct UserObject *)self).data[0], lowerouter1 = thisouter1;
  if (inheritingObject1) {
    struct UserObject *inho1 = (struct UserObject *)inheritingObject1;
    while (inho1->super != GraceDefaultObject) inho1 = (struct UserObject *)inho1->super;
    inho1->super = obj1;
    self = inheritingObject1;
    *selfslot = self;
    lowerouter1 = (*(struct UserObject *)self).data[0];
    (*(struct UserObject *)self).data[0] = thisouter1;
  }
  struct UserObject *uo3 = (struct UserObject*)obj1;
  uo3->data[1] = emptyclosure;
  Method *meth_meth_Synthesiser_name_40__41_mono_40__41_waveform3 = addmethod2pos(obj1, "name()mono()waveform", &meth_Synthesiser_name_40__41_mono_40__41_waveform3, 1);
int argcv_meth_Synthesiser_name_40__41_mono_40__41_waveform3[] = {1, 1, 1};
meth_meth_Synthesiser_name_40__41_mono_40__41_waveform3->type = alloc_MethodType(3, argcv_meth_Synthesiser_name_40__41_mono_40__41_waveform3);
  meth_meth_Synthesiser_name_40__41_mono_40__41_waveform3->definitionModule = modulename;
  meth_meth_Synthesiser_name_40__41_mono_40__41_waveform3->definitionLine = 21;
  Method *meth_meth_Synthesiser_name_40__41_mono_40__41_waveform3_object = addmethod2pos(obj1, "name()mono()waveform()object", &meth_Synthesiser_name_40__41_mono_40__41_waveform3_object, 1);
int argcv_meth_Synthesiser_name_40__41_mono_40__41_waveform3_object[] = {1, 1, 1};
meth_meth_Synthesiser_name_40__41_mono_40__41_waveform3_object->type = alloc_MethodType(3, argcv_meth_Synthesiser_name_40__41_mono_40__41_waveform3_object);
  meth_meth_Synthesiser_name_40__41_mono_40__41_waveform3_object->definitionModule = modulename;
  meth_meth_Synthesiser_name_40__41_mono_40__41_waveform3_object->definitionLine = 21;
  sourceObject = obj1;
objclass1 = obj1->class;
  objclass1->definitionModule = modulename;
  objclass1->definitionLine = 21;
  (*(struct UserObject *)self).data[0] = lowerouter1;
  self = oldself1;
  selfslot = oldselfslot1;
  stackframe = oldstackframe1;
// compilenode returning obj1
  *var_Synth = obj1;
  if (obj1 == undefined)
    callmethod(done, "assignment", 0, NULL, NULL);
// compilenode returning done
// compilenode returning done
// Begin line 4
  setline(4);
  setmodule(modulename);
  setsource(originalSourceLines);
// compilenode returning 
// Begin line 21
  setline(21);
  setmodule(modulename);
  setsource(originalSourceLines);
  int callframe22 = gc_frame_new();
  if (strlit23 == NULL) {
    strlit23 = alloc_String("Synth1");
    gc_root(strlit23);
  }
// compilenode returning strlit23
  gc_frame_newslot(strlit23);
  Object bool24 = alloc_Boolean(1);
// compilenode returning bool24
  gc_frame_newslot(bool24);
  if (strlit25 == NULL) {
    strlit25 = alloc_String("sine");
    gc_root(strlit25);
  }
// compilenode returning strlit25
  gc_frame_newslot(strlit25);
// compilenode returning *var_Synth
  params[0] = strlit23;
  params[1] = bool24;
  params[2] = strlit25;
  partcv[0] = 1;
  partcv[1] = 1;
  partcv[2] = 1;
  Object call26 = callmethod(*var_Synth, "name()mono()waveform",
    3, partcv, params);
  gc_frame_end(callframe22);
// compilenode returning call26
  *var_s = call26;
  if (call26 == undefined)
    callmethod(done, "assignment", 0, NULL, NULL);
  block_savedest(self);
  Object closure27 = createclosure(1, "s");
setclosureframe(closure27, stackframe);
  addtoclosure(closure27, var_s);
  struct UserObject *uo27 = (struct UserObject*)self;
  uo27->data[2] = (Object)closure27;
  Method *meth_meth_Synthesiser_s27 = addmethod2pos(self, "s", &meth_Synthesiser_s27, 2);
int argcv_meth_Synthesiser_s27[] = {0};
meth_meth_Synthesiser_s27->type = alloc_MethodType(1, argcv_meth_Synthesiser_s27);
  meth_meth_Synthesiser_s27->definitionModule = modulename;
  meth_meth_Synthesiser_s27->definitionLine = 21;
// compilenode returning 
  block_savedest(self);
  Object closure28 = createclosure(1, "s:=");
setclosureframe(closure28, stackframe);
  addtoclosure(closure28, var_s);
  struct UserObject *uo28 = (struct UserObject*)self;
  uo28->data[3] = (Object)closure28;
  Method *meth_meth_Synthesiser_s_58__61_28 = addmethod2pos(self, "s:=", &meth_Synthesiser_s_58__61_28, 3);
int argcv_meth_Synthesiser_s_58__61_28[] = {1};
meth_meth_Synthesiser_s_58__61_28->type = alloc_MethodType(1, argcv_meth_Synthesiser_s_58__61_28);
  meth_meth_Synthesiser_s_58__61_28->definitionModule = modulename;
  meth_meth_Synthesiser_s_58__61_28->definitionLine = 21;
// compilenode returning 
// compilenode returning done
  gc_frame_end(frame);
  return self;
}
int main(int argc, char **argv) {
  initprofiling();
  setCompilerModulePath("/Users/samminns/git/minigrace");
  setModulePath("/usr/lib/grace/modules");
  gracelib_argv(argv);
  Object params[1];
  undefined = alloc_Undefined();
  done = alloc_done();
  Object tmp_argv = alloc_BuiltinList();
  gc_root(tmp_argv);
  int partcv_push[] = {1};
  int i; for (i=0; i<argc; i++) {
    params[0] = alloc_String(argv[i]);
    callmethod(tmp_argv, "push", 1, partcv_push, params);
  }
  module_sys_init_argv(tmp_argv);
  module_Synthesiser_init();
  gracelib_stats();
  return 0;
}
